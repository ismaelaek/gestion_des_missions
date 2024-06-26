import { useEffect } from "react";
import Loader from "./loader";
import {
	Document,
	View,
	Text,
	Page,
	StyleSheet,
	Font,
	Image,
	PDFViewer,
} from "@react-pdf/renderer";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJuridPremieres } from "../storage/jusridictionsSlice";
import { getMissions } from "../storage/missionsSlice";
import { getProfessionnels } from "../storage/professionnelsSlice";
import { getCaders } from "../storage/dataSlice";

import Amiri from "../assets/Amiri-Regular.ttf";
import logoImage from "../assets/MJ-Maroc.png";

Font.register({ family: "Amiri", src: Amiri });

export default function PrintMissiom() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { caders } = useSelector((state) => state.data);
	const { missions, missionsIsLoading } = useSelector(
		(state) => state.missions
	);
	const { professionnels } = useSelector((state) => state.professionnels);
	const { juriPremieres } = useSelector((state) => state.jusridictions);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getMissions());
		dispatch(getProfessionnels());
		dispatch(getJuridPremieres());
		dispatch(getCaders());
		if (!mission) {
			navigate("/");
		}
	}, [dispatch]);
	const mission = missions.find((mission) => mission.id == id);
	const professionnel = professionnels.find(
		(prof) => prof.id === mission.idProfessionnel
	);
	const jurid = juriPremieres.find(
		(jurid) => jurid.id === mission.idJuridiction
	);
	const cader = caders.find((cader) => cader.id === professionnel.IdCadre);

	const styles = StyleSheet.create({
		page: {
			flexDirection: "column",
			backgroundColor: "#fff",
			paddingRight: "10px",
		},
		section: {
			margin: 10,
			padding: 10,
			flexGrow: 1,
		},
		text: {
			fontFamily: "Amiri",
			textAlign: "center",
		},
		text1: {
			fontFamily: "Amiri",
			fontSize: "12px",
			paddingLeft: "30px",
		},
		direct: {
			fontFamily: "Amiri",
			fontSize: "8px",
		},
		image: {
			width: 80,
			height: 80,
		},
		header: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginTop: 40,
		},
		number: {
			width: "100vw",
			marginTop: 20,
			textAlign: "right",
			paddingRight: 50,
		},
		title: {
			width: "100vw",
			marginTop: 22,
			paddingRight: 30,
			display: "flex",
			justifyContent: "center",
		},
		textTitle: {
			fontFamily: "Amiri",
			textAlign: "center",
			fontSize: 24,
		},
		body: {
			paddingRight: 100,
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			marginTop: 20,
		},
		bodyText: {
			fontFamily: "Amiri",
			textAlign: "center",
			fontSize: 18,
		},
		table: {
			marginTop: 20,
			padding: "0 50px",
		},
		container: {
			flexDirection: "row",
		},
		cell: {
			flex: 1,
			fontFamily: "Amiri",
			padding: 5,
			textAlign: "center",
			height: "100%",
			border: "1px solid black",
		},
		edition: {
			width: "100vw",
			marginTop: 20,
			paddingLeft: 50,
		},
		footer: {
			width: "100vw",
			textAlign: "center",
			marginTop: 20,
			paddingLeft: 50,
		},
	});

	if (missionsIsLoading) {
		return <Loader />;
	} else {
		return (
			<main>
				<PDFViewer className="w-full h-screen">
					<Document>
						<Page style={styles.page} size="A4">
							<View style={styles.header}>
								<Text style={{ width: 100 }}></Text>
								<Image src={logoImage} style={styles.image} />
								<View
									style={{
										padding: "10px 20px",
										display: "flex",
										justifyContent: "center",
									}}>
									<Text style={styles.text}> المملكة المغربية ب</Text>
									<Text style={styles.text1}> وزارة العدل</Text>
									<Text style={styles.direct}>
										مديرية الدراسات و التعاون و التحديث
									</Text>
								</View>
							</View>
							<View style={styles.number}>
								<Text style={styles.text1}>
									رقم : {`${mission?.NummeroMission} / م د ت ت `}
								</Text>
							</View>
							<View style={styles.title}>
								<Text style={styles.textTitle}> أمر بمهمة</Text>
								<Text style={styles.textTitle}>****</Text>
							</View>
							<View style={styles.body}>
								<Text style={styles.bodyText}>
									يؤدن للسيد : {professionnel?.prenom} {professionnel?.nom}
								</Text>
								<Text style={styles.bodyText}>
									{professionnel?.NumeroSomme} : رقم التأجير
								</Text>
								<Text style={styles.bodyText}>
									الإطار : {cader && cader.cadreLibelle_ar}
								</Text>
								<Text style={styles.bodyText}>
									بالتوجه إلى : {jurid && jurid.JurLibelle_ar}
								</Text>
								<Text style={styles.bodyText}>
									نوع المهمة :{mission?.TypeMission}
								</Text>
							</View>
							<View style={styles.table}>
								<View>
									<View style={styles.container}>
										<Text style={styles.cell}> الرجـــوع</Text>
										<Text style={styles.cell}> الذهـــاب</Text>
									</View>
									<View style={styles.container}>
										<Text style={styles.cell}>{mission?.DateRetour}</Text>
										<Text style={styles.cell}>{mission?.DateAller}</Text>
									</View>
								</View>
							</View>
							<View style={styles.edition}>
								<Text style={styles.text1}>حرر بالرباط في</Text>
								<Text style={styles.text1}>{mission?.DateEdition}</Text>
							</View>
							<View style={styles.footer}>
								<Text style={styles.text1}>
									مديرية الدراسات و التعاون و التحديث
								</Text>
								<Text style={styles.text1}> الإمضاء</Text>
							</View>
						</Page>
					</Document>
				</PDFViewer>
			</main>
		);
	}
}
