'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { ApprovalItem, ContractRiskFinding, PortfolioAsset, WhaleActivity } from '@/lib/types';
import { usd } from '@/lib/server/format';

type ApiResponse<T> = { data: T; error: string | null };
type AuditResponse = {
  address: string;
  riskScore: number;
  verdict: string;
  findings: ContractRiskFinding[];
};

type FetchState<T> = { loading: boolean; data: T | null; error: string | null };

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, cache: 'no-store' });
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || json.error) throw new Error(json.error ?? 'Request failed');
  return json.data;
}

function useFetchState<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ loading: true, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, data: null, error: null });

    getJson<T>(url, controller.signal)
      .then((data) => setState({ loading: false, data, error: null }))
      .catch((error: Error) => {
        if (controller.signal.aborted) return;
        setState({ loading: false, data: null, error: error.message });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

export default function Dashboard() {
  const [chain, setChain] = useState('all');
  const portfolioQuery = chain === 'all' ? '/api/portfolio' : `/api/portfolio?chain=${chain}`;

  const portfolio = useFetchState<PortfolioAsset[]>(portfolioQuery);
  const whales = useFetchState<WhaleActivity[]>('/api/whales');
  const approvals = useFetchState<ApprovalItem[]>('/api/approvals');

  const netWorth = useMemo(() => (portfolio.data ?? []).reduce((acc, item) => acc + item.valueUsd, 0), [portfolio.data]);

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <Card className="p-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cryscry Terminal</h1>
          <p className="text-sm text-white/70">Portfolio • whale radar • smart money • approvals revoke • contract risk scanner</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-white/70">Live Net Worth</p>
          <p className="text-2xl font-semibold text-magenta">{usd.format(netWorth)}</p>
        </div>
      </Card>

      <Card className="p-4 flex gap-2 flex-wrap">
        {['all', 'ethereum', 'base', 'arbitrum', 'polygon', 'bsc'].map((c) => (
          <button key={c} onClick={() => setChain(c)} className={`rounded-lg px-3 py-1.5 text-sm capitalize ${chain === c ? 'bg-magenta text-white' : 'bg-white/10'}`}>
            {c}
          </button>
        ))}
      </Card>

      <section className="grid lg:grid-cols-2 gap-6">
        <DataCard
          title="Wallet Portfolio"
          state={portfolio}
          render={(rows) => (
            <ul className="space-y-2">
              {rows.map((asset) => (
                <li key={asset.id} className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span>{asset.symbol} · {asset.chain}</span>
                  <span>{usd.format(asset.valueUsd)} ({asset.dayChangePct}%)</span>
                </li>
              ))}
            </ul>
          )}
        />

        <DataCard
          title="Whale Activity Feed"
          state={whales}
          render={(rows) => (
            <ul className="space-y-2">
              {rows.map((event) => (
                <li key={event.id} className="text-sm flex items-center justify-between gap-2">
                  <span><span className="text-autumn">{event.label}</span> {event.eventType} {event.token}</span>
                  <Badge>{event.chain}</Badge>
                  <span className="text-magenta">{usd.format(event.amountUsd)}</span>
                </li>
              ))}
            </ul>
          )}
        />
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <DataCard
          title="Revoke Wallet Access"
          state={approvals}
          render={(rows) => (
            <ul className="space-y-2">
              {rows.map((a) => (
                <li key={a.id} className="text-sm flex justify-between">
                  <span>{a.token} • {a.spender}</span>
                  <Badge tone={a.risk}>{a.risk} risk</Badge>
                </li>
              ))}
            </ul>
          )}
        />
        <AuditPanel />
      </section>
    </main>
  );
}

function DataCard<T>({ title, state, render }: { title: string; state: FetchState<T[]>; render: (rows: T[]) => ReactNode }) {
  return (
    <Card className="p-5">
      <h2 className="font-semibold mb-3">{title}</h2>
      {state.loading && <p className="text-white/70 animate-pulse">Loading…</p>}
      {state.error && <p className="text-red-300">{state.error}</p>}
      {!state.loading && !state.error && (!state.data || state.data.length === 0) && <p className="text-white/60">No data available.</p>}
      {!state.loading && !state.error && state.data && state.data.length > 0 && render(state.data)}
    </Card>
  );
}

function AuditPanel() {
  const [address, setAddress] = useState('0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });

      const json = (await res.json()) as ApiResponse<AuditResponse>;
      if (!res.ok || json.error) throw new Error(json.error ?? 'Scan failed');
      setResult(json.data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-5">
      <motion.h2 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-semibold mb-3">Smart Contract Audit Tool</motion.h2>
      <div className="space-y-2">
        <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/20 px-3 py-2 text-sm" />
        <button onClick={scan} className="rounded-xl bg-magenta px-4 py-2 text-sm font-semibold">{loading ? 'Scanning...' : 'Run audit'}</button>
        {error && <p className="text-red-300 text-sm">{error}</p>}
        {result && <pre className="text-xs bg-black/40 rounded-xl p-3 overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </Card>
  );
}
