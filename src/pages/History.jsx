import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Trash2, 
  ArrowRight, 
  FileSearch, 
  Info, 
  Sparkles
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
    <div className='flex-1 flex flex-col bg-navy-950 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto w-full space-y-8'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2.5'>
              <div className='p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'>
                <Clock className='w-5 h-5' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
                Assessment History
              </h1>
            </div>
            <p className='text-xs sm:text-sm text-slate-400'>
              Audit log of evaluations recorded locally in this browser session.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className='px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-rose-400 hover:border-rose-500/30 flex items-center gap-1.5 transition-colors'
              >
                <Trash2 className='w-3.5 h-3.5' />
                <span>Clear History</span>
              </button>
            )}

            <Button
              to='/assessment'
              variant='primary'
              size='sm'
              icon={Sparkles}
              className='shadow-glow-cyan'
            >
              New Assessment
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer variant='banner' />

        {/* Assessment Records Table or Empty State */}
        {history.length > 0 ? (
          <div className='rounded-2xl p-6 bg-navy-900/80 border border-slate-800 shadow-card-glow space-y-4'>
            <div className='flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono'>
              <span>Total Recorded Assessments: <strong className='text-white'>{history.length}</strong></span>
              <span className='text-[11px] text-slate-500'>Stored in Local Storage</span>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-left text-xs font-mono' aria-label='Saved assessment history'>
                <thead className='border-b border-slate-800 text-slate-400 uppercase tracking-wider'>
                  <tr>
                    <th className='py-3 px-4'>Assessment ID</th>
                    <th className='py-3 px-4'>Timestamp</th>
                    <th className='py-3 px-4 font-sans'>Patient Profile</th>
                    <th className='py-3 px-4 font-sans'>Model-Predicted Class</th>
                    <th className='py-3 px-4 font-sans'>Hyperplane Margin</th>
                    <th className='py-3 px-4 text-right font-sans'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-800/60'>
                  {history.map((record) => {
                    const isClass1 = record.predictedClass === 1;
                    return (
                      <tr key={record.id} className='hover:bg-white/5 transition-colors'>
                        <td className='py-3.5 px-4 font-bold text-cyan-300'>
                          {record.id}
                        </td>
                        <td className='py-3.5 px-4 text-slate-400'>
                          {new Date(record.timestamp).toLocaleString()}
                        </td>
                        <td className='py-3.5 px-4 text-slate-300 font-sans'>
                          {record.inputs.age} yrs • {record.inputs.sex === '1' ? 'Male' : 'Female'} • BP: {record.inputs.trestbps}
                        </td>
                        <td className='py-3.5 px-4 font-sans'>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isClass1
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {isClass1 ? 'Class 1 (Presence)' : 'Class 0 (Absence)'}
                          </span>
                        </td>
                        <td className='py-3.5 px-4'>
                          <span className='text-slate-300'>
                            {record.decisionMargin > 0 ? `+${record.decisionMargin}` : record.decisionMargin}
                          </span>
                        </td>
                        <td className='py-3.5 px-4 text-right space-x-2 font-sans'>
                          <button
                            onClick={() => openAssessment(record, '/results')}
                            className='text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1'
                          >
                            <span>Results</span>
                            <ArrowRight className='w-3 h-3' />
                          </button>
                          <span className='text-slate-600'>|</span>
                          <button
                            onClick={() => openAssessment(record, '/shap')}
                            className='text-xs font-semibold text-electric-purple hover:text-purple-300 inline-flex items-center gap-1'
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
          /* Empty State */
          <div className='rounded-3xl p-12 bg-navy-900/60 border border-slate-800 text-center space-y-4 max-w-xl mx-auto'>
            <div className='w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto'>
              <Info className='w-6 h-6 text-cyan-400' />
            </div>
            <div className='space-y-1.5'>
              <h2 className='text-lg font-bold text-white'>
                No previous assessments yet
              </h2>
              <p className='text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto'>
                CardioTwin AI strictly preserves data integrity and never fabricates mock patient records. Once you complete an assessment, it will be safely logged here for your review during this session.
              </p>
            </div>
            <div className='pt-2'>
              <Button
                to='/assessment'
                variant='primary'
                size='md'
                icon={Sparkles}
                className='shadow-glow-cyan'
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
