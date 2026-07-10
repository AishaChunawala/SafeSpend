import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, FileText, CheckCircle2, AlertCircle, Upload, X, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ParsedRow {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

const mockParsed: ParsedRow[] = [
  { id: 'r1', date: '2026-07-14', description: 'SWIGGY BANGALORE', amount: -450, category: 'Dining' },
  { id: 'r2', date: '2026-07-13', description: 'AMAZON IN PAYMENT', amount: -1299, category: 'Shopping' },
  { id: 'r3', date: '2026-07-13', description: 'SALARY CREDIT', amount: 100000, category: 'Income' },
  { id: 'r4', date: '2026-07-12', description: 'NETFLIX SUBSCRIPTION', amount: -649, category: 'Entertainment' },
  { id: 'r5', date: '2026-07-11', description: 'BIGBASKET GROCERY', amount: -2100, category: 'Food' },
  { id: 'r6', date: '2026-07-10', description: 'UBER TRIP', amount: -285, category: 'Transport' },
];

export function StatementPage() {
  const { currency } = useApp();
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'done'>('idle');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    setTimeout(() => setStatus('parsing'), 800);
    setTimeout(() => {
      setStatus('done');
      toast({ title: 'Statement parsed', description: `${mockParsed.length} transactions detected and categorized.` });
    }, 2200);
  }, [toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const reset = () => { setFileName(null); setStatus('idle'); };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <GlassCard padding="lg" className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-bg"><FileUp className="h-5 w-5 text-white" /></div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Statement Upload</h3>
            <p className="text-sm text-muted-foreground">Upload a bank or card statement — we&apos;ll auto-categorize every transaction.</p>
          </div>
        </div>

        {status === 'idle' && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={cn('flex flex-col items-center justify-center gap-4 py-16 rounded-2xl border-2 border-dashed transition-colors cursor-pointer',
              dragOver ? 'border-brand bg-brand/5' : 'border-border/60 bg-muted/20 hover:border-brand/40 hover:bg-brand/5')}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input id="file-input" type="file" accept=".csv,.pdf,.xlsx,.txt" className="hidden"
              onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl brand-bg"><Upload className="h-7 w-7 text-white" /></div>
            <div className="text-center">
              <p className="font-medium">Drop your statement here</p>
              <p className="text-sm text-muted-foreground mt-1">Supports CSV, PDF, XLSX — up to 10MB</p>
            </div>
            <Button variant="outline" className="glass border-border/50">Browse Files</Button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {(status === 'uploading' || status === 'parsing') && fileName && (
            <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 py-12">
              <div className="flex items-center gap-3"><FileText className="h-6 w-6 text-muted-foreground" /><span className="font-medium">{fileName}</span></div>
              <div className="w-full max-w-sm">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: '0%' }} animate={{ width: status === 'parsing' ? '90%' : '40%' }} transition={{ duration: status === 'parsing' ? 1.4 : 0.8, ease: 'easeInOut' }} className="h-full rounded-full brand-gradient" />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">{status === 'uploading' ? 'Uploading...' : 'Parsing and categorizing transactions...'}</p>
              </div>
            </motion.div>
          )}

          {status === 'done' && fileName && (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-chart-6/10 border border-chart-6/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-6" />
                  <div>
                    <p className="font-medium text-chart-6">Statement parsed successfully</p>
                    <p className="text-xs text-muted-foreground">{mockParsed.length} transactions found in {fileName}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={reset} aria-label="Clear"><X className="h-4 w-4" /></Button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 brand-text" /> Auto-categorized transactions</div>
                <div className="flex flex-col divide-y divide-border/30 rounded-2xl overflow-hidden bg-muted/20">
                  {mockParsed.map((row, idx) => (
                    <motion.div key={row.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * idx }} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg shrink-0 text-xs font-bold',
                          row.amount > 0 ? 'bg-chart-6/15 text-chart-6' : 'bg-destructive/10 text-destructive')}>
                          {row.amount > 0 ? '+' : '-'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{row.description}</p>
                          <p className="text-xs text-muted-foreground">{row.date} · {row.category}</p>
                        </div>
                      </div>
                      <span className={cn('text-sm font-semibold whitespace-nowrap', row.amount > 0 && 'text-chart-6')}>
                        {formatCurrency(Math.abs(row.amount), currency, { compact: true, sign: row.amount > 0 })}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-xl bg-muted/30">
                <AlertCircle className="h-3.5 w-3.5" /><span>Review the categories above. You can edit any transaction before confirming.</span>
              </div>

              <div className="flex gap-2">
                <Button className="brand-bg text-white hover:opacity-90">Confirm & Import</Button>
                <Button variant="outline" className="glass border-border/50" onClick={reset}>Upload Another</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
