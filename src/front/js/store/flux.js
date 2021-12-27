const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: false,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      logout: () => {
        console.log(history);
        sessionStorage.removeItem("token");
        setStore({ logged: false });
      },
      registrarse: async (mail, pass) => {
        console.log("mail", mail);
        console.log("pass", pass);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: mail,
          password: pass,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        try {
          let result = await fetch(
            process.env.BACKEND_URL + "signup",
            requestOptions
          ).then((response) => response.json());
          /* .then((result) => {
            console.log(result);
            alert("Registrado");
            setStore({ logged: true });
          })
          .catch((error) => {
            console.log("error", error);
            alert("Error al registrase");
          }); */
          console.log(result);
          alert("Registrado");
          setStore({ logged: true });
        } catch (error) {
          console.log("error", error);
          alert("Error al registrase");
        }
      },
      enviarDatos: async (e, mail, pass) => {
        e.preventDefault();
        console.log("mail", mail);
        console.log("pass", pass);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: mail,
          password: pass,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        try {
          let result = await fetch(
            process.env.BACKEND_URL + "user",
            requestOptions
          ).then((response) => response.json());
          /* .then((result) => {
              console.log(result);
              sessionStorage.setItem("token", result.token);
              setStore({ logged: true });
            })
            .catch((error) => console.log("error", error)); */
          console.log(result);
          sessionStorage.setItem("token", result.token);
          setStore({ logged: true });
        } catch (error) {
          setStore({ logged: false });
          console.log("error", error);
        }
      },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
