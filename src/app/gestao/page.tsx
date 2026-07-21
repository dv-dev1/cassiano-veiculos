import {
  estoqueGestao,
  resumoEstoque,
  resumoLoja,
  giroEstoque,
  nivelGiro,
} from "@/data/gestao-mock";
import { resumoMeta } from "@/data/vendas-mock";
import { HOJE_ISO, diaPorExtenso } from "@/lib/hoje";
import { AvisoMeta, AvisoSemMargem } from "@/components/gestao/painel/PainelAvisos";
import { VisaoVendas } from "@/components/gestao/painel/VisaoVendas";
import { LojaAgora } from "@/components/gestao/painel/LojaAgora";

export default function PainelPage() {
  const estoque = estoqueGestao;
  const resumo = resumoEstoque(estoque);
  const loja = resumoLoja(estoque);
  const giro = giroEstoque(estoque, 3);
  const meta = resumoMeta();

  const pedemAtencao = estoque.filter(
    (v) => v.statusGestao !== "vendido" && nivelGiro(v.diasEstoque) !== "ok",
  ).length;

  const dia = diaPorExtenso(HOJE_ISO);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-secondary">Painel</h1>
        <p className="mt-1 text-sm text-muted-strong">
          {dia.charAt(0).toUpperCase() + dia.slice(1)}
        </p>
      </header>

      <div className="space-y-8">
        {/* Avisos */}
        <div className="grid gap-3">
          <AvisoMeta meta={meta} />
          <AvisoSemMargem quantidade={resumo.semMargem} />
        </div>

        <VisaoVendas />

        <LojaAgora resumo={loja} giro={giro} pedemAtencao={pedemAtencao} />
      </div>
    </div>
  );
}
