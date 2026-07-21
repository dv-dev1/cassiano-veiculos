import { leadsMock } from "@/data/clientes-mock";
import { AgendaView } from "./AgendaView";

export default function AgendaPage() {
  return <AgendaView leads={leadsMock} />;
}
