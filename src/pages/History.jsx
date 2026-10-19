import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Trash2, 
  ArrowRight, 
  FileSearch, 
  Sparkles,
  ShieldCheck,
  Activity
} from 'lucide-react';
import Button from '../components/Button';
import Disclaimer from '../components/Disclaimer';
import { apiService } from '../services/api';

export const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(() => apiService.getAssessmentHistory());

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all saved assessment history? This will delete locally stored evaluation records.')) {
      apiService.clearAssessmentHistory();
      setHistory([]);
    }
  };

  const openAssessment = (assessment, targetRoute = '/results') => {
    apiService.saveAssessmentToHistory(assessment);
    navigate(targetRoute, { state: { assessment } });
  };

  return (
    <div className='flex-1 flex flex-col bg-[#040614] py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-950/60'>
          <div className='space-y-1.5'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'>
                <Clock className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                Evaluation History
              </h1>
              <span className='px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/50 text-purple-300 border border-purple-500/30'>
                Audit Trail
              </span>
            </div>
            <p className='text-xs sm:text-sm text-[#9496b8]'>
              Local browser session audit log of clinical model predictions and SHAP attributions.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className='px-3.5 py-2 rounded-full bg-[#070b24] border border-rose-500/30 text-xs font-mono text-rose-300 hover:text-white hover:bg-rose-950/40 hover:border-rose-500/50 flex items-center gap-1.5 transition-all'
              >
                <Trash2 className='w-3.5 h-3.5' />
                <span>Clear History</span>
              </button>
            )}

            <Button
              to='/predict'
              variant='primary'
              size='sm'
              icon={Sparkles}
              className='shadow-glow-purple rounded-full px-5'
            >
              New Assessment
            </Button>
          </div>
        </div>

        <Disclaimer />

        {history.length > 0 ? (
          <div className='rounded-3xl p-6 bg-[#070b24]/80 border border-purple-500/20 shadow-card-glow space-y-4'>
            <div className='flex items-center justify-between pb-3 border-b border-purple-950/60 text-xs text-[#9496b8] font-mono'>
              <span>Total Recorded Assessments: <strong className='text-white'>{history.length}</strong></span>
              <span className='text-[11px] text-purple-300/70 flex items-center gap-1'>
                <ShieldCheck className='w-3.5 h-3.5 text-emerald-400' /> Encrypted Local Session Cache
              </span>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-left text-xs font-mono' aria-label='Saved assessment history'>
                <thead className='border-b border-purple-950/60 text-purple-300/80 uppercase tracking-wider text-[11px]'>
                  <tr>
                    <th className='py-3.5 px-4'>Assessment ID</th>
                    <th className='py-3.5 px-4'>Timestamp</th>
                    <th className='py-3.5 px-4 font-sans'>Patient Profile</th>
                    <th className='py-3.5 px-4 font-sans'>Model Classification</th>
                    <th className='py-3.5 px-4 font-sans'>Decision Margin</th>
                    <th className='py-3.5 px-4 text-right font-sans'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-purple-950/40'>
                  {history.map((record) => {
                    const isClass1 = record.predictedClass === 1;
                    return (
                      <tr key={record.id} className='hover:bg-purple-950/20 transition-colors'>
                        <td className='py-4 px-4 font-bold text-purple-300'>
                          {record.id.slice(0, 10)}...
                        </td>
                        <td className='py-4 px-4 text-[#9496b8]'>
                          {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(record.timestamp).toLocaleDateString()}
                        </td>
                        <td className='py-4 px-4 text-slate-300 font-sans'>
                          {record.inputs.age} yrs • {record.inputs.sex === '1' ? 'Male' : 'Female'} • BP: {record.inputs.trestbps}
                        </td>
                        <td className='py-4 px-4 font-sans'>
                          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold ${
                            isClass1
                              ? 'bg-fuchsia-950/50 text-fuchsia-300 border border-fuchsia-500/40 shadow-[0_0_10px_rgba(217,70,239,0.2)]'
                              : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          }`}>
                            {isClass1 ? 'Class 1 (Presence)' : 'Class 0 (Absence)'}
                          </span>
                        </td>
                        <td className='py-4 px-4'>
                          <span className='text-slate-300 font-bold'>
                            {record.decisionMargin > 0 ? `+${record.decisionMargin}` : record.decisionMargin}
                          </span>
                        </td>
                        <td className='py-4 px-4 text-right space-x-2 font-sans'>
                          <button
                            onClick={() => openAssessment(record, '/results')}
                            className='text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 transition-colors'
                          >
                            <span>Results</span>
                            <ArrowRight className='w-3 h-3' />
                          </button>
                          <span className='text-purple-900'>|</span>
                          <button
                            onClick={() => openAssessment(record, '/explain')}
                            className='text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 inline-flex items-center gap-1 transition-colors'
                          >
                            <span>SHAP</span>
                            <FileSearch className='w-3 h-3' />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='rounded-3xl p-12 sm:p-16 bg-[#070b24]/60 border border-purple-500/20 text-center space-y-5 max-w-xl mx-auto shadow-card-glow backdrop-blur-md'>
            <div className='w-16 h-16 rounded-3xl bg-purple-950/50 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-glow-purple'>
              <Activity className='w-8 h-8' />
            </div>
            <div className='space-y-2'>
              <h2 className='text-xl font-bold text-white'>
                No previous assessments yet
              </h2>
              <p className='text-xs sm:text-sm text-[#9496b8] leading-relaxed max-w-md mx-auto'>
                CardioTwin AI strictly preserves clinical integrity and never generates fabricated records. Run your first clinical evaluation to view and inspect saved case metrics here.
              </p>
            </div>
            <div className='pt-2'>
              <Button
                to='/predict'
                variant='primary'
                size='md'
                icon={Sparkles}
                className='shadow-glow-purple rounded-full px-7'
              >
                Start Your First Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
