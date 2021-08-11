import { StyleSheet, Dimensions } from "react-native";

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export const welcomeStyles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		alignItems: "center",
		position: "absolute",
		top: 80,
	},
	logoText: {
		color: "white",
		fontSize: 45,
		fontFamily: "roboto-light",
		fontWeight: "bold",
	},
	registerButton: {
		width: "90%",
		marginTop: 10,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	loginButton: {
		width: "90%",
		marginTop: 100,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
	},
	registerText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
	loginText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const loginStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	loginForm: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 100,
		width: "100%",
	},
	textForm: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	loginButton: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const activateAccountStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	button: {
		alignSelf: "center",
		width: "90%",
		marginTop: 40,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
		paddingHorizontal: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const registrationStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	logoContainer: {
		alignItems: "center",
	},
	logoText: {
		color: "white",
		fontSize: 45,
		fontFamily: "roboto-light",
		fontWeight: "bold",
	},
	registrationForm: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		width: "100%",
	},
	textForm: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	button: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const objectsPageStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: RECIPE_ITEM_MARGIN,
		marginTop: 20,
		width: (SCREEN_WIDTH -  (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
		height: "100%",
		borderColor: '#cccccc',
		borderWidth: 0.5,
		borderRadius: 15
	  },
	  photo: {
		width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
		height: RECIPE_ITEM_HEIGHT,
		borderRadius: 15,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	  },
	  title: {
		flex: 1,
		fontSize: 17,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#444444',
		marginTop: 3,
		marginRight: 5,
		marginLeft: 5,
	  },
	  category: {
		textAlign: 'center',
		marginTop: 5,
		marginBottom: 5
	  }
});

const { width: viewportWidth } = Dimensions.get('window');


export const objectScreenStyles = StyleSheet.create({
	container: {
	  backgroundColor: 'white',
	  flex: 1
	},  
	image: {
	  ...StyleSheet.absoluteFillObject,
	  width: '100%',
	  height: 250
	},
	imageContainer: {
	  flex: 1,
	  justifyContent: 'center',
	  width: viewportWidth,
	  height: 250
	},
	infoObjectContainer: {
	  flex: 1,
	  margin: 25,
	  marginTop: 10,
	  justifyContent: 'center',
	  alignItems: 'center'
	},
	infoObjectName: {
	  fontSize: 28,
	  margin: 10,
	  fontWeight: 'bold',
	  color: 'black',
	  textAlign: 'center'
	}
  });