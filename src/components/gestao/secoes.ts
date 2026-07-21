import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  Trophy,
  FileText,
  type LucideIcon,
} from "lucide-react";

// Seções da área dos vendedores (a central de gestão). A ordem espelha a
// referência (print da Belloni): Painel, Estoque, Clientes, Agenda, Metas,
// Relatórios. O conteúdo de cada uma entra depois; aqui é só a navegação.
export interface Secao {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const secoes: Secao[] = [
  { label: "Painel", href: "/gestao", icon: LayoutDashboard },
  { label: "Estoque", href: "/gestao/estoque", icon: Car },
  { label: "Clientes", href: "/gestao/clientes", icon: Users },
  { label: "Agenda", href: "/gestao/agenda", icon: Calendar },
  { label: "Metas", href: "/gestao/metas", icon: Trophy },
  { label: "Relatórios", href: "/gestao/relatorios", icon: FileText },
];
