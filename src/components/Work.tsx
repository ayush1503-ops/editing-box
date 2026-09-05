import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Play, X } from "lucide-react";
import { FadeUp, MaskText } from "./MaskText";

type Video = {
  id: string;
  title: string;
  tag: string;
  thumb: string;
  reel: string;
};

const VIDEOS: Video[] = [
  {
    id: "1TT8yoRh4ZTbDsUVUNAxsjUv0IM0hlYly",
    title: "EDIT 01",
    tag: "VIDEO MONTAGE",
    thumb: "thumbs/edit-1.jpg",
    reel: "REEL — 01",
  },
  {
    id: "1zOgV1obI1Vw4uU-ULAAOfhLi3kZa_9_l",
    title: "EDIT 02",
    tag: "VIDEO MONTAGE",
    thumb: "thumbs/edit-2.jpg",
    reel: "REEL — 02",
  },
  {
    id: "18275zQOONDQwDEVpd2vuVVMGW0ORd6Uc",
    title: "EDIT 03",
    tag: "VIDEO MONTAGE",
    thumb: "thumbs/edit-3.jpg",
    reel: "REEL — 03",
  },
  {
    id: "1tpqDdM9-efDinZeP7_4nsyI9GKgl_vNu",
    title: "EDIT 04",
    tag: "VIDEO MONTAGE",
    thumb: "thumbs/edit-4.jpg",
    reel: "REEL — 04",
  },
  {
    id: "1pb_jvgwI-Kk3CUxd-b-WhjeCGR88tt2e",
    title: "EDIT 05",
    tag: "VIDEO MONTAGE",
    thumb: "thumbs/edit-5.jpg",
    reel: "REEL — 05",
  },
  {
    id: "1fOqFehhUgm9C0RMT4QbhSm8C79MOHVG8",
    title: "EDIT 06",
    tag: "VIDEO MONTAGE",
    thumb: "thumbs/edit-6.jpg",
    reel: "REEL — 06",
  },
];

function ThumbImg({ video }: { video: Video }) {
  const driveSrc = `https://drive.google.com/thumbnail?id=${video.id}&sz=w1200`;
  const [src, setSrc] = useState(driveSrc);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-ink" />}
      <img
        src={src}
        alt={`${video.title} — ${video.tag}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (src !== video.thumb) setSrc(video.thumb);
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.06] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

function Card({ video, index, onOpen }: { video: Video; index: number; onOpen: () => void }) {
  return (
    <FadeUp delay={(index % 3) * 0.09}>
      <button
        onClick={onOpen}
        data-cursor="PLAY"
        className="group relative block w-full overflow-hidden rounded-md border border-bone/10 bg-ink text-left"
        aria-label={`Play ${video.title}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <ThumbImg video={video} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/25" />
          <div className="absolute inset-0 bg-signal/0 transition-colors duration-500 group-hover:bg-signal/15" />

          <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.3em] text-bone/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 border border-bone/25 px-2 py-1 font-mono text-[9px] tracking-[0.2em] text-bone/70">
            9:16
          </span>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal">
              <Play className="ml-0.5 h-5 w-5 fill-black text-black" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-display text-xl uppercase tracking-tight text-bone transition-colors duration-500 group-hover:text-signal md:text-2xl">
              {video.title}
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-signal">{video.tag}</p>
          </div>
        </div>
      </button>
    </FadeUp>
  );
}

/** Own branded player skin — clean native controls over the direct stream,
 *  Drive embed kept only as an automatic fallback */
function Player({ video, onClose }: { video: Video; onClose: () => void }) {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"video" | "embed">("video");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{ width: "min(92vw, calc((100svh - 130px) * 0.5625))" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* title bar always ABOVE the frame — never covers/crops the video */}
        <div className="flex h-12 items-center justify-between rounded-t-md border border-b-0 border-bone/15 bg-black px-4">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-bone">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" />
            {video.title}
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-smoke">EDITINGBOX® PLAYER</span>
        </div>
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-b-md border border-bone/15 bg-ink">
          {/* loading shimmer (embed fallback only; video mode shows the poster) */}
          {!ready && mode === "embed" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink">
              <Loader2 className="h-6 w-6 animate-spin text-signal" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-smoke">LOADING REEL</span>
            </div>
          )}

          {mode === "video" ? (
            <video
              key={video.id}
              poster={video.thumb}
              controls
              controlsList="nodownload"
              playsInline
              preload="metadata"
              onLoadedData={() => setReady(true)}
              onError={() => setMode("embed")}
              className="absolute inset-0 h-full w-full bg-black object-contain"
            >
              <source src={`https://drive.usercontent.google.com/download?id=${video.id}&export=download`} />
              <source src={`https://drive.google.com/uc?export=download&id=${video.id}`} />
            </video>
          ) : (
            /* Drive embed, shifted up so the host's header chrome falls outside the
               visible box: the player viewport stays exactly 9:16 -> full frame,
               controls at the bottom, nothing cropped */
            <iframe
              key={video.id}
              src={`https://drive.google.com/file/d/${video.id}/preview`}
              title={video.title}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setReady(true)}
              className="absolute left-0 -top-[52px] h-[calc(100%+52px)] w-full"
            />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
          <span className="text-signal">NOW PLAYING</span>
          <span>{video.reel}</span>
        </div>

        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-signal text-black transition-transform duration-300 hover:rotate-90"
          aria-label="Close player"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [active, setActive] = useState<Video | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="work" className="relative px-5 py-20 md:px-10 md:py-28">
      <div className="mb-10 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
        <span className="text-signal">( 02 )</span>
        <span>SELECTED WORK</span>
      </div>

      <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <FadeUp>
            <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-signal">PORTFOLIO</p>
          </FadeUp>
          <h2 className="font-display uppercase leading-[0.9] tracking-tight">
            <MaskText>
              <span className="block text-[11vw] text-bone md:text-[6.5vw]">
                THE <span className="text-signal">WORK</span>
              </span>
            </MaskText>
          </h2>
        </div>
        <FadeUp delay={0.25}>
          <p className="max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.2em] text-smoke">
            SIX PIECES OF THE CRAFT.
            <br />
            <span className="text-bone">TAP A FRAME TO PLAY.</span>
          </p>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <Card key={v.id} video={v} index={i} onOpen={() => setActive(v)} />
        ))}
      </div>

      <AnimatePresence>{active && <Player video={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}
