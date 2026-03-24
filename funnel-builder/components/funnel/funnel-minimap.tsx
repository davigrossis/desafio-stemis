"use client";

import { useEffect, useState } from "react";
import { MiniMap } from "@xyflow/react";
import { NODE_CATEGORY_COLORS, type FunnelRenderNode } from "@/lib/funnel-node";

const DEFAULT_NODE_COLOR = "color-mix(in oklab, var(--foreground) 20%, white)";
const MD_MEDIA_QUERY = "(min-width: 768px)";

function getMiniMapNodeColor(node: FunnelRenderNode): string {
  return NODE_CATEGORY_COLORS[node.data.category] ?? DEFAULT_NODE_COLOR;
}

export default function FunnelMiniMap() {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MD_MEDIA_QUERY);

    const onChange = () => {
      setIsMdUp(mediaQuery.matches);
    };

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const width = isMdUp ? 220 : 130;
  const height = isMdUp ? 140 : 90;

  return (
    <MiniMap<FunnelRenderNode>
      position="bottom-right"
      style={{
        width,
        height,
      }}
      nodeColor={getMiniMapNodeColor}
      nodeBorderRadius={8}
      nodeStrokeWidth={2}
      bgColor="var(--card)"
      maskColor="color-mix(in oklab, var(--foreground) 20%, transparent)"
      maskStrokeColor="color-mix(in oklab, var(--foreground) 30%, transparent)"
      maskStrokeWidth={1}
      className="overflow-hidden rounded-xl md:rounded-2xl border border-border/80 bg-background/95 shadow-md md:shadow-lg backdrop-blur-md"
    />
  );
}