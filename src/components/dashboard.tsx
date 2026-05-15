'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ApprovalItem, PortfolioAsset, WhaleActivity } from '@/lib/types';

interface DashboardData {
  portfolio: PortfolioAsset[];
  whales: WhaleActivity[];
  approvals: ApprovalItem[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/portfolio').then((r) => r.json()),
      fetch('/api/whales').then((r) => r.json()),
      fetch('/api/approvals').then((r) => r.json())
    ])
      .then(([portfolio, whales, approvals]) => setData({ portfolio, whales, approvals }))
      .catch(() => setError('Unable to load terminal streams.'));
  }, []);

  if (error) return <div className="m-10 panel p-6 text-red-300">{error}</div>;
  if (!data) return <div className="m-10 panel p-6 animate-pulse">Loading intelligence streams…</div>;

  const netWorth = data.portfolio.reduce((acc, item) => acc + item.valueUsd, 0);

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="panel p-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cryscry Terminal</h1>
          <p className="text-sm text-white/70">Whale tracking • portfolio intelligence • revoke center • contract scanner</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-white/70">Net Worth</p>
          <p className="text-2xl font-semibold text-magenta">${netWorth.toLocaleString()}</p>
        </div>
      </motion.div>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="panel p-5">
          <h2 className="font-semibold mb-3">Wallet Portfolio</h2>
          {data.portfolio.length === 0 ? <p className="text-white/60">No assets found.</p> : (
            <ul className="space-y-2">
              {data.portfolio.map((asset) => <li key={asset.symbol} className="flex justify-between text-sm border-b border-white/10 pb-2"><span>{asset.symbol} · {asset.chain}</span><span>${asset.valueUsd.toLocaleString()} ({asset.dayChangePct}%)</span></li>)}
            </ul>
          )}
        </div>

        <div className="panel p-5">
          <h2 className="font-semibold mb-3">Whale Activity Feed</h2>
          <ul className="space-y-3">
            {data.whales.map((event) => <li key={event.txHash} className="text-sm"><span className="text-autumn">{event.label}</span> {event.eventType} {event.token} <span className="text-magenta">${event.amountUsd.toLocaleString()}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="panel p-5">
          <h2 className="font-semibold mb-3">Revoke Wallet Access</h2>
          <ul className="space-y-2">
            {data.approvals.map((a) => <li key={a.id} className="text-sm flex justify-between"><span>{a.token} • {a.spender}</span><span className={a.risk === 'high' ? 'text-red-300' : 'text-yellow-200'}>{a.risk} risk</span></li>)}
          </ul>
        </div>
        <ContractAuditPanel />
      </section>
    </main>
  );
}

function ContractAuditPanel() {
  const [address, setAddress] = useState('0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
  const [state, setState] = useState<{ loading: boolean; result?: any; err?: string }>({ loading: false });

  const scan = async () => {
    setState({ loading: true });
    try {
      const res = await fetch('/api/audit', { method: 'POST', body: JSON.stringify({ address }) });
      const json = await res.json();
      setState({ loading: false, result: json });
    } catch {
      setState({ loading: false, err: 'scan failed' });
    }
  };

  return <div className="panel p-5"><h2 className="font-semibold mb-3">Smart Contract Audit Tool</h2>
    <div className="space-y-2"><input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/20 px-3 py-2 text-sm" />
      <button onClick={scan} className="rounded-xl bg-magenta px-4 py-2 text-sm font-semibold">{state.loading ? 'Scanning...' : 'Run audit'}</button>
      {state.err && <p className="text-red-300 text-sm">{state.err}</p>}
      {state.result && <pre className="text-xs bg-black/40 rounded-xl p-3 overflow-auto">{JSON.stringify(state.result, null, 2)}</pre>}
    </div>
  </div>;
}
