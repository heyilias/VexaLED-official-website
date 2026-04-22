import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';

type InstallType = 'Indoor' | 'Outdoor';
type Category = 'Fixed Installation' | 'Rental & Staging';
type Shape = 'Flat' | 'Curve' | 'Corner' | 'Flat + Curve + Flat';

const PRODUCTS = [
  { series: 'SF SERIES', models: [
    { name: 'VX-SF1.9', pitch: '1.95 mm', brightness: '800 nits', panel: '320×160 mm' },
    { name: 'VX-SF1.5', pitch: '1.53 mm', brightness: '1000 nits', panel: '320×160 mm' },
    { name: 'VX-SF1.9 Lite', pitch: '1.95 mm', brightness: '600 nits', panel: '320×160 mm' },
    { name: 'VX-SF2.5', pitch: '2.5 mm', brightness: '1000 nits', panel: '320×160 mm' },
    { name: 'VX-SF4', pitch: '4 mm', brightness: '800 nits', panel: '320×160 mm' },
  ]},
  { series: 'WK SERIES', models: [
    { name: 'VX-WK1.2', pitch: '1.25 mm', brightness: '600 nits', panel: '600×337.5 mm' },
    { name: 'VX-WK1.5', pitch: '1.56 mm', brightness: '800 nits', panel: '600×337.5 mm' },
    { name: 'VX-WK2.5 Pro', pitch: '2.5 mm', brightness: '1000 nits', panel: '600×337.5 mm' },
  ]},
];

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [installType, setInstallType] = useState<InstallType>('Indoor');
  const [category, setCategory] = useState<Category>('Fixed Installation');
  const [shape, setShape] = useState<Shape>('Flat');
  const [pitchRange, setPitchRange] = useState([0, 17]);
  const [brightnessRange, setBrightnessRange] = useState([0, 10000]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const radioClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all border ${
      active
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border/40 bg-transparent text-muted-foreground hover:border-muted-foreground/50'
    }`;

  return (
    <main className="min-h-screen bg-background">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} isSearchOpen={isSearchOpen} onCloseSearch={() => setIsSearchOpen(false)} />

      <div className="pt-20 pb-16 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wider text-foreground">
              VEXALED Display Configurator
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className={step === 1 ? 'text-primary font-medium' : ''}>⚙ Step 1</span>
              <span className={step === 2 ? 'text-primary font-medium' : ''}>📋 Step 2</span>
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8"
            >
              {/* Left: Filters */}
              <div className="space-y-6 rounded-xl border border-border/30 bg-card/50 p-6">
                {/* IN/OUT */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">In / Out</label>
                  <div className="flex gap-3">
                    {(['Indoor', 'Outdoor'] as InstallType[]).map(t => (
                      <button key={t} onClick={() => setInstallType(t)} className={radioClass(installType === t)}>{t}</button>
                    ))}
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">Category</label>
                  <div className="flex gap-3 flex-wrap">
                    {(['Fixed Installation', 'Rental & Staging'] as Category[]).map(c => (
                      <button key={c} onClick={() => setCategory(c)} className={radioClass(category === c)}>{c}</button>
                    ))}
                  </div>
                </div>

                {/* SHAPE */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">Shape</label>
                  <div className="flex gap-3 flex-wrap">
                    {(['Flat', 'Curve', 'Corner', 'Flat + Curve + Flat'] as Shape[]).map(s => (
                      <button key={s} onClick={() => setShape(s)} className={radioClass(shape === s)}>{s}</button>
                    ))}
                  </div>
                </div>

                {/* PIXEL PITCH */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">Pixel Pitch (mm)</label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-foreground w-10 text-center">{pitchRange[0]}</span>
                    <input
                      type="range" min="0" max="17" step="0.5"
                      value={pitchRange[1]}
                      onChange={e => setPitchRange([pitchRange[0], parseFloat(e.target.value)])}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-sm text-foreground w-10 text-center">{pitchRange[1]}</span>
                  </div>
                </div>

                {/* BRIGHTNESS */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">Brightness (Nits)</label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-foreground w-14 text-center">{brightnessRange[0]}</span>
                    <input
                      type="range" min="0" max="10000" step="100"
                      value={brightnessRange[1]}
                      onChange={e => setBrightnessRange([brightnessRange[0], parseInt(e.target.value)])}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-sm text-foreground w-14 text-center">{brightnessRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Right: Product List */}
              <div className="space-y-4">
                {/* Selected product bar */}
                <div className="flex items-center gap-3 rounded-lg bg-primary/10 border border-primary/30 px-4 py-3">
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">Selected Product:</span>
                  <span className="text-sm text-foreground font-medium">{selectedProduct || '—'}</span>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold border-b border-border/30">
                  <span>Product</span>
                  <span>Pixel Pitch</span>
                  <span>Brightness</span>
                  <span>Panel Size</span>
                </div>

                {/* Product series */}
                {PRODUCTS.map(series => (
                  <div key={series.series}>
                    <h3 className="font-display text-lg font-bold text-foreground px-4 py-3">{series.series}</h3>
                    <div className="space-y-1">
                      {series.models.map(model => (
                        <button
                          key={model.name}
                          onClick={() => setSelectedProduct(model.name)}
                          className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 w-full px-4 py-3 rounded-lg text-sm transition-all ${
                            selectedProduct === model.name
                              ? 'bg-primary/10 border border-primary/30 text-foreground'
                              : 'hover:bg-muted/30 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span className="text-left font-medium">{model.name}</span>
                          <span>{model.pitch}</span>
                          <span>{model.brightness}</span>
                          <span>{model.panel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="rounded-xl border border-border/30 bg-card/50 p-8">
                <h2 className="font-display text-xl font-bold text-foreground mb-6 uppercase tracking-wider">Display Setup</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Setup */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block font-semibold">Setup By</label>
                      <div className="flex gap-3">
                        {['Size', 'Panel Array', 'Fit to Wall'].map(s => (
                          <button key={s} className={radioClass(s === 'Size')}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Display Width</label>
                        <input type="number" defaultValue={3.6} step={0.1} className="w-full bg-transparent border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Display Height</label>
                        <input type="number" defaultValue={1.35} step={0.1} className="w-full bg-transparent border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Resolution</label>
                      <div className="flex gap-3">
                        {['FHD', 'UHD'].map(r => (
                          <button key={r} className={radioClass(r === 'FHD')}>{r}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Power Redundancy</label>
                      <div className="flex gap-3">
                        <button className={radioClass(true)}>Yes</button>
                        <button className={radioClass(false)}>No</button>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="flex items-center justify-center rounded-xl bg-muted/20 border border-border/20 p-8 min-h-[300px]">
                    <div className="text-center">
                      <div className="w-48 h-28 mx-auto rounded-lg border-2 border-primary/30 bg-primary/5 flex items-center justify-center mb-4">
                        <span className="text-xs text-muted-foreground">3.6m × 1.35m</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Display Preview</p>
                    </div>
                  </div>

                  {/* Spec Summary */}
                  <div className="space-y-4">
                    <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">Specification Summary</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        ['Model', selectedProduct || 'VX-WK1.2'],
                        ['Configuration', '6×4 cabinets'],
                        ['Shape', shape],
                        ['Screen Size', '3.6m × 1.35m'],
                        ['Diagonal', '3.84m'],
                        ['Resolution', '2880 × 1080'],
                        ['Viewing Distance', '3m'],
                        ['Power Supply', '2880 W'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between border-b border-border/20 pb-2">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="text-foreground font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <Button variant="heroOutline" size="lg" onClick={() => setStep(1)} className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back
              </Button>
            ) : <div />}
            {step === 1 ? (
              <Button
                variant="hero"
                size="lg"
                onClick={() => selectedProduct ? setStep(2) : alert('Please select a product first.')}
                className="group"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button variant="hero" size="lg" className="group">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
