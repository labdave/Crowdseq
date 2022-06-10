import { Gene } from "src/app/gene/models/gene";
import { Transcript } from "src/app/transcript/models/transcript";

export class AminoAcidChange {
    annotations: any;
    genes: Gene[];
    id: number;
    long_name: string;
    short_name: string;
    transcripts: Transcript[];
}
