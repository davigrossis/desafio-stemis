import { Button } from "@/components/ui/button";

export default function Header() {
	return (
		<header className="shrink-0 border-b border-black/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 dark:border-white/10">
			<div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
				<h1 className="text-base font-semibold text-foreground sm:text-lg">
					Funil de Vendas
				</h1>

				<div className="flex items-center gap-2">
					<Button type="button" variant="outline">
						Novo node
					</Button>

					<Button type="button">
						Mais ações
					</Button>
				</div>
			</div>
		</header>
	);
}
