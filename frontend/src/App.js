import React from "react";
import { Provider } from "react-redux";
import Index from "./PubgProject/Index";
import Store from "./PubgProject/Redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={Store}>
      <Index />
      <ToastContainer />
    </Provider>
  );
};

export default App;
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// const App = () => {
//   const [state, setstate] = useState([]);
//   const url = "http://localhost:8080/college/events";
//   useEffect(() => {
//     axios.get(url).then((res) => {
//       // console.log(res.data.data);
//       // console.log(JSON.stringify(res.data.data));
//       // setstate(res.data.data);
//     });
//   }, []);
//   return (
//     <div>
//       <p>getting data</p>
//       {/* {state.map((it) => {
//         console.log(JSON.parse(it.images).map((it) => it.url));
//         return (
//           <div>
//             <p>{it.title}</p>
//             {JSON.parse(it.images).map((it) => {
//               return (
//                 <img
//                   src={"http://localhost:8080" + it.url}
//                   className="h-20 w-32"
//                   alt=""
//                 />
//               );
//             })}
//           </div>
//         );
//       })} */}
//     </div>
//   );
// };

// export default App;
