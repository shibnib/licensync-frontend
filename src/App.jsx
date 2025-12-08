import React, { useState } from 'react';
import { 
  Shield, CheckCircle, Clock, Lock, Zap, Search, Users, HelpCircle, 
  Share2, Copy, Music, Disc, X, LayoutGrid, DollarSign 
} from 'lucide-react';

// MASTER SWITCH
const LIVE_MODE = false;

export default function LicenSyncDashboard() {
  const [currentView, setCurrentView] = useState('fanscan'); 
  const [scanQuery, setScanQuery] = useState('');
  const [scanConfirmation, setScanConfirmation] = useState(null); 
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- ACTIONS ---
  const simulateAction = (action, delay = 1000) => {
    setIsProcessing(true);
    setTimeout(() => { action(); setIsProcessing(false); }, delay);
  };

  // STEP 1: SMART IDENTIFICATION STRATEGY
  const runFanScan_Step1 = () => {
    if (!scanQuery) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const isUrl = scanQuery.includes('http') || scanQuery.includes('spotify');
      
      if (isUrl) {
        setScanConfirmation({
          artist: "Unknown Artist", 
          assetName: "Identified Parent Album",
          assetType: "OFFICIAL ALBUM RELEASE",
          scope: "Full Album Aggregate",
          icon: <Disc className="w-8 h-8" />
        });
      } else {
        setScanConfirmation({
          artist: scanQuery,
          assetName: "Complete Master Catalog",
          assetType: "FULL DISCOGRAPHY",
          scope: "Global Streaming Aggregate",
          icon: <LayoutGrid className="w-8 h-8" />
        });
      }
      setIsProcessing(false);
    }, 1200);
  };

  // STEP 2: CALCULATE NUMBERS
  const runFanScan_Step2_Confirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let baseMissing;
      let tracks;
      
      if (scanConfirmation.assetType === 'FULL DISCOGRAPHY') {
         baseMissing = Math.floor(Math.random() * (180000 - 45000) + 45000);
         tracks = Math.floor(Math.random() * (150 - 40) + 40);
      } else {
         baseMissing = Math.floor(Math.random() * (25000 - 3500) + 3500);
         tracks = Math.floor(Math.random() * (14 - 8) + 8);
      }

      setScanResult({
        artist: scanConfirmation.artist,
        estimatedMissing: baseMissing,
        unclaimedTracks: tracks,
        assetType: scanConfirmation.assetType
      });
      setScanConfirmation(null); 
      setIsProcessing(false);
    }, 1500);
  };

  const resetScan = () => {
    setScanQuery('');
    setScanConfirmation(null);
    setScanResult(null);
  }

  // --- VIEW COMPONENTS ---
  const FanScanView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500 bg-[#020617]">
      <div className="max-w-3xl w-full relative">
        
        {/* STATE 1: INITIAL INPUT */}
        {!scanResult && !scanConfirmation && (
          <>
            <div className="mb-8">
              <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                Recover Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Missing Royalties
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                Enter an Artist Name (to scan full discography) or paste a Spotify link (to scan an official album release).
              </p>
            </div>

            <div className="flex gap-0 max-w-xl mx-auto shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] rounded-lg relative z-10">
               <input 
                 type="text" 
                 placeholder="e.g. 'Taylor Swift' or Album Link..."
                 className="flex-1 bg-[#0f172a] border border-slate-700/50 rounded-l-lg px-6 py-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                 value={scanQuery}
                 onChange={(e) => setScanQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && runFanScan_Step1()}
               />
               <button 
                 onClick={runFanScan_Step1}
                 disabled={isProcessing || !scanQuery}
                 className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-r-lg font-bold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
               >
                 {isProcessing ? 'LOCATING...' : 'SCAN'}
               </button>
            </div>
          </>
        )}

        {/* STATE 2: ASSET VERIFICATION */}
        {scanConfirmation && !scanResult && (
           <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 relative overflow-hidden max-w-lg mx-auto animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <button onClick={resetScan} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
              
              <div className="mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4 text-blue-400">
                  {scanConfirmation.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Asset Identified</h3>
                <p className="text-sm text-slate-400">We consolidated the search to ensure maximum recovery.</p>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-4 text-left border border-slate-800/50 mb-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 shrink-0">
                  <Music className="w-8 h-8" />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold uppercase px-2 py-0.5 rounded border border-blue-500/30">
                        {scanConfirmation.assetType}
                      </span>
                   </div>
                   <div className="text-lg font-bold text-white leading-tight mb-0.5">{scanConfirmation.assetName}</div>
                   <div className="text-slate-400 text-xs">{scanConfirmation.artist} • {scanConfirmation.scope}</div>
                </div>
              </div>

              <button 
                 onClick={runFanScan_Step2_Confirm}
                 disabled={isProcessing}
                 className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white py-4 rounded-xl font-bold tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
               >
                 {isProcessing ? (
                    'AGGREGATING DATA...'
                 ) : (
                    <>
                    <Zap className="w-5 h-5 fill-current" />
                    CALCULATE MISSING REVENUE
                    </>
                 )}
               </button>
           </div>
        )}

        {/* STATE 3: FINAL RESULTS */}
        {scanResult && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 relative overflow-hidden max-w-xl mx-auto animate-in zoom-in-95 duration-300">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
             <button onClick={resetScan} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>

             <div className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">
                Total Unclaimed Revenue ({scanResult.assetType === 'FULL DISCOGRAPHY' ? 'Catalog' : 'Album'})
             </div>
             
             <div className="text-6xl font-extrabold text-white mb-4 tracking-tighter drop-shadow-2xl">
               ${scanResult.estimatedMissing.toLocaleString()}
             </div>
             
             <div className="text-emerald-400 text-sm mb-8 flex items-center justify-center gap-2 bg-emerald-500/10 py-2 px-4 rounded-full w-fit mx-auto border border-emerald-500/20">
               <CheckCircle className="w-4 h-4" />
               Across {scanResult.unclaimedTracks} identified tracks
             </div>

             <div className="bg-slate-800/50 rounded-xl p-6 text-left border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-3 font-bold uppercase tracking-wide">Be the Hero & Help them recover this:</div>
                <div className="bg-black/40 p-4 rounded-lg border border-slate-700 text-slate-300 font-mono text-xs mb-4 leading-relaxed">
                  {`Hey @${scanResult.artist.replace(/[^\w]/g, '')}, I just scanned your ${scanResult.assetType === 'FULL DISCOGRAPHY' ? 'discography' : 'album'} on LicenSync and found $${scanResult.estimatedMissing.toLocaleString()} in unpaid royalties waiting for you. 💸 You should check it out.`}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-[#1DA1F2] hover:bg-[#1a94da] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Tweet This
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Copy className="w-5 h-5" />
                    Copy Text
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const FAQView = () => (
    <div className="p-10 max-w-4xl mx-auto overflow-y-auto h-full custom-scrollbar">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-500" /> Legal & Operational FAQ
      </h2>
      <div className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">For Managers & Artists</h3>
          <div className="space-y-4">
            <div><div className="text-slate-200 font-medium mb-1">Is this legal advice?</div><p className="text-sm text-slate-400">No. LicenSync acts as an authorized enforcement agent. We do not provide legal counsel.</p></div>
            <div><div className="text-slate-200 font-medium mb-1">How do I get paid?</div><p className="text-sm text-slate-400">We use Stripe Connect. You receive your share (80-90%) instantly; we never hold your royalties.</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = ({ activeCase }) => {
    return <div className="p-10 text-slate-500">Dashboard View (Restricted Access)</div>;
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden selection:bg-indigo-500/30">
      <div className="w-64 border-r border-slate-800/60 flex flex-col bg-[#0B0F19]">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-700"><Zap className="text-blue-500 w-5 h-5" /></div>
          <span className="font-bold text-xl tracking-tight text-white">Licen<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Sync</span></span>
        </div>
        <div className="flex-1 px-3 space-y-1">
          <NavButton icon={<Users />} label="Fan Scan Protocol" active={currentView === 'fanscan'} onClick={() => setCurrentView('fanscan')} />
          <NavButton icon={<Shield />} label="Enforcement Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavButton icon={<HelpCircle />} label="Legal / FAQ" active={currentView === 'faq'} onClick={() => setCurrentView('faq')} />
        </div>
        <div className="p-4 border-t border-slate-800/60"><div className="flex items-center space-x-2 text-xs"><div className={`w-2 h-2 rounded-full ${LIVE_MODE ? 'bg-emerald-500' : 'bg-amber-500'}`} /><span className="text-slate-400">{LIVE_MODE ? 'LIVE' : 'DEMO v7.0'}</span></div></div>
      </div>
      <div className="flex-1 bg-[#020617] relative">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        {currentView === 'fanscan' && <FanScanView />}
        {currentView === 'faq' && <FAQView />}
        {currentView === 'dashboard' && <DashboardView activeCase={null} />}
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return <button onClick={onClick} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>{React.cloneElement(icon, { size: 18 })}<span className="text-sm font-medium">{label}</span></button>;
}

