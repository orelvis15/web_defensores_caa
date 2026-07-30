import { ProgramaPage } from "@/components/programs/ProgramaPage";
import { UrgentHero } from "@/components/programs/UrgentHero";
import { ClinicaMigratoria } from "@/components/programs/ClinicaMigratoria";
import { getProgram } from "@/config/programs";

export default function TemaMigratorio() {
  return (
    <ProgramaPage program={getProgram("migratorio")}>
      <UrgentHero />
      <ClinicaMigratoria />
    </ProgramaPage>
  );
}
