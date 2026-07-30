import { ProgramaPage } from "@/components/programs/ProgramaPage";
import { PresosPoliticos } from "@/components/programs/PresosPoliticos";
import { ReportesEnVivo } from "@/components/programs/ReportesEnVivo";
import { CaravanaLibertad } from "@/components/programs/CaravanaLibertad";
import { getProgram } from "@/config/programs";

export default function LibertadCuba() {
  return (
    <ProgramaPage program={getProgram("libertad-cuba")}>
      <PresosPoliticos />
      <ReportesEnVivo />
      <CaravanaLibertad />
    </ProgramaPage>
  );
}
