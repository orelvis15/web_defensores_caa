import { ProgramaPage } from "@/components/programs/ProgramaPage";
import { PaquetesAyuda } from "@/components/programs/PaquetesAyuda";
import { getProgram } from "@/config/programs";

export default function AyudaPersonas() {
  return (
    <ProgramaPage program={getProgram("ayuda")}>
      <PaquetesAyuda />
    </ProgramaPage>
  );
}
