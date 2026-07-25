export default function GSAPCardStyles({ accent }) {
    return (
        <style>{`
            .proc-section {
                position: relative;
                background: #f8fafc;
                border-top: 1px solid rgba(0, 0, 0, 0.08);
            }

            .proc-pin {
                --accent: ${accent};
                position: relative;
              max-width: 1280px;  
              margin-inline: auto;    
              
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                font-feature-settings: 'tnum' 1;
            }

            .proc-grid-bg {
                position: absolute;
                inset: 0;
                background-image:
                    linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
                background-size: 56px 56px;
                mask-image: radial-gradient(ellipse at 30% 50%, black 15%, transparent 72%);
                pointer-events: none;
                z-index: 0;
            }
            .proc-corner {
                position: absolute;
                width: 22px;
                height: 22px;
                z-index: 1;
                pointer-events: none;
                opacity: 0.4;
            }
            .proc-corner::before, .proc-corner::after {
                content: '';
                position: absolute;
                background: rgba(15, 23, 42, 0.2);
            }
            .proc-corner::before { width: 100%; height: 1px; top: 0; left: 0; }
            .proc-corner::after { width: 1px; height: 100%; top: 0; left: 0; }
            .proc-corner--tl { top: 24px; left: 24px; }
            .proc-corner--tr { top: 24px; right: 24px; transform: scaleX(-1); }
            .proc-corner--bl { bottom: 24px; left: 24px; transform: scaleY(-1); }
            .proc-corner--br { bottom: 24px; right: 24px; transform: scale(-1, -1); }

            .proc-header {
                position: relative;
                z-index: 2;
                padding: 56px 64px 0;
                display: flex;
                align-items: baseline;
                justify-content: space-between;
                gap: 24px;
                flex-wrap: wrap;
            }
            .proc-eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                font-size: 0.72rem;
                font-weight: 700;
                letter-spacing: 0.16em;
                text-transform: uppercase;
                color: var(--accent);
                transition: color 0.5s ease;
            }
            .proc-eyebrow::before {
                content: '';
                display: block;
                width: 20px;
                height: 1px;
                background: currentColor;
            }
            .proc-readout {
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.04em;
                color: rgba(15, 23, 42, 0.5);
            }
            .proc-readout b {
                color: #0f172a;
                font-weight: 700;
            }

            .proc-progress-wrap {
                position: relative;
                z-index: 2;
                padding: 0 64px;
                margin-top: 22px;
            }
            .proc-progress-track {
                position: relative;
                width: 100%;
                height: 2px;
                background: rgba(0, 0, 0, 0.08);
            }
            .proc-progress-fill {
                height: 100%;
                background: var(--accent);
                transform-origin: left;
                box-shadow: 0 0 10px var(--accent);
                transition: background 0.5s ease, box-shadow 0.5s ease;
            }
            .proc-ticks {
                display: flex;
                margin-top: 16px;
                gap: 10px;
            }
            .proc-tick {
                all: unset;
                box-sizing: border-box;
                cursor: pointer;
                flex: 1;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 16px;
                border-radius: 6px;
                border: 1px solid rgba(0, 0, 0, 0.08);
                background: rgba(255, 255, 255, 0.7);
                box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
            }
            .proc-tick:hover { border-color: rgba(0, 0, 0, 0.18); background: #ffffff; }
            .proc-tick:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
            .proc-tick--done {
                border-color: rgba(0, 0, 0, 0.12);
            }
            .proc-tick--active {
                border-color: var(--accent);
                background: #ffffff;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
                transform: translateY(-1px);
            }
            .proc-tick-num {
                flex-shrink: 0;
                width: 26px;
                height: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.68rem;
                font-weight: 700;
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-radius: 4px;
                color: rgba(15, 23, 42, 0.5);
                transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
            }
            .proc-tick--done .proc-tick-num {
                border-color: rgba(0, 0, 0, 0.18);
                color: rgba(15, 23, 42, 0.7);
            }
            .proc-tick--active .proc-tick-num {
                border-color: var(--accent);
                background: var(--accent);
                color: #ffffff;
            }
            .proc-tick-label {
                display: flex;
                flex-direction: column;
                gap: 2px;
                min-width: 0;
            }
            .proc-tick-title {
                font-size: 0.82rem;
                font-weight: 600;
                color: rgba(15, 23, 42, 0.6);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: color 0.3s ease;
            }
            .proc-tick-status {
                font-size: 0.62rem;
                font-weight: 600;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: rgba(15, 23, 42, 0.35);
            }
            .proc-tick--active .proc-tick-title { color: #0f172a; font-weight: 700; }
            .proc-tick--active .proc-tick-status { color: var(--accent); }
            .proc-tick--done .proc-tick-title { color: rgba(15, 23, 42, 0.75); }

            .proc-body {
                position: relative;
                z-index: 2;
                flex: 1;
                display: flex;
                align-items: center;
                padding: 44px 64px 72px;
            }
            .proc-panels {
                position: relative;
                display: grid;
                width: 100%;
                perspective: 1800px;
            }
            .proc-panel {
                position: relative;
                grid-area: 1 / 1;
                display: grid;
                grid-template-columns: 280px 1fr;
                gap: 72px;
                align-items: center;
                padding: 56px 64px;
                border-radius: 12px;
                border: 1px solid rgba(0, 0, 0, 0.08);
                background: #ffffff;
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.06);
                backface-visibility: hidden;
                transform: rotateY(90deg);
                will-change: transform;
            }
            .proc-panel::before {
                content: '';
                position: absolute;
                top: -1px;
                left: 32px;
                right: 32px;
                height: 3px;
                border-radius: 2px 2px 0 0;
                background: var(--panel-accent, var(--accent));
                box-shadow: 0 2px 10px var(--panel-accent, var(--accent));
            }
            .proc-panel:first-child { transform: rotateY(0deg); }

            .proc-frame {
                width: 64px;
                height: 64px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.6rem;
                color: var(--panel-accent, var(--accent));
                margin-bottom: 28px;
            }
            .proc-frame::before {
                content: '';
                position: absolute;
                inset: 0;
                border: 1px dashed var(--panel-accent, var(--accent));
                border-radius: 8px;
                opacity: 0.6;
            }
            .proc-step-tag {
                font-size: 0.72rem;
                font-weight: 700;
                letter-spacing: 0.1em;
                color: var(--panel-accent, var(--accent));
                margin-bottom: 18px;
            }
            .proc-title {
                font-size: clamp(2.2rem, 3.6vw, 3.4rem);
                font-weight: 900;
                letter-spacing: -0.03em;
                line-height: 1.02;
                color: #0f172a;
                margin-bottom: 8px;
            }
            .proc-subtitle {
                font-size: 0.85rem;
                font-weight: 600;
                color: #64748b;
                letter-spacing: 0.03em;
            }

            .proc-right { display: flex; flex-direction: column; gap: 26px; }
            .proc-desc {
                font-size: clamp(1rem, 1.25vw, 1.1rem);
                color: #475569;
                font-weight: 450;
                line-height: 1.8;
                max-width: 56ch;
            }
            .proc-tags { display: flex; flex-wrap: wrap; gap: 8px; }
            .proc-tag {
                padding: 6px 14px;
                border-radius: 6px;
                border: 1px solid rgba(0, 0, 0, 0.08);
                background: #f1f5f9;
                font-size: 0.74rem;
                font-weight: 600;
                color: #334155;
                letter-spacing: 0.01em;
            }
            .proc-tag::before { content: '→ '; color: var(--panel-accent, var(--accent)); }

            .proc-metric {
                display: inline-flex;
                align-items: baseline;
                gap: 16px;
                padding: 16px 20px;
                width: fit-content;
                border-left: 3px solid var(--panel-accent, var(--accent));
                border-radius: 0 6px 6px 0;
                background: #f8fafc;
            }
            .proc-metric-value {
                font-size: 1.6rem;
                font-weight: 800;
                color: var(--panel-accent, var(--accent));
            }
            .proc-metric-label {
                font-size: 0.78rem;
                font-weight: 600;
                color: #64748b;
                max-width: 140px;
                line-height: 1.4;
            }

            @media (prefers-reduced-motion: reduce) {
                .proc-panel { position: relative; transform: none; }
                .proc-panels { display: flex; flex-direction: column; gap: 64px; perspective: none; }
            }

            @media (max-width: 1024px) {
                .proc-header, .proc-progress-wrap { padding-left: 32px; padding-right: 32px; }
                .proc-body { padding: 40px 32px 56px; }
                .proc-panel { grid-template-columns: 1fr; gap: 28px; padding: 40px 32px; }
                .proc-corner { display: none; }
            }
            @media (max-width: 640px) {
                .proc-header, .proc-progress-wrap { padding-left: 20px; padding-right: 20px; }
                .proc-body { padding: 32px 20px 48px; }
                .proc-panel { padding: 32px 22px; }
                .proc-title { font-size: 2.1rem; }
                .proc-ticks { gap: 6px; }
                .proc-tick { padding: 10px; justify-content: center; }
                .proc-tick-label { display: none; }
            }
        `}</style>
    );
}
