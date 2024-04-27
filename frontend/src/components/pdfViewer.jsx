import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintMissiom from "./printMisiion";

const PDFViewer = () => {
	return (
		<main>
			<PDFDownloadLink document={<PrintMissiom />} fileName="mission.pdf">
				{({ blob, url, loading, error }) =>
					loading ? "Loading document..." : "Download now!"
				}
			</PDFDownloadLink>
		</main>
	);
};

export default PDFViewer;
