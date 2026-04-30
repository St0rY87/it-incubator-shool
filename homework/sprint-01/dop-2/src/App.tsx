import { useState } from "react";
import "./App.css";
import { Modal } from "./components/modal/Modal";
import s from "./components/modal/Modal.module.css";
import { SuperButton } from "./components/SuperButton";
import { SuperCrosses } from "./components/SuperCrosses";
// import styles from "./components/SuperButton.module.css";

const crosses = [
  { id: 1, model: "ADIDAS", size: "XXX" },
  { id: 2, model: "ABIBAS", size: "YYY" },
  { id: 3, model: "PUMA", size: "ZZZ" },
];

export const App = () => {
  return (
    <div>
      {/* <SuperButton onClick={()=>{}} className={styles.redForSuperButton}>Red Super Button</SuperButton>
            <SuperButton onClick={()=>{}} className={styles.blueForSuperButton}>blue Super Button</SuperButton> */}
      {/* <SuperButton color={"red"}>Red superbutton</SuperButton>
      <SuperButton color={"secondary"}>Secondary superbutton</SuperButton>
      <SuperButton>Default superbutton</SuperButton>
      <SuperButton disabled>Disabled superbutton</SuperButton> */}

      {/* <SuperCrosses crosses={crosses}>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi,
          architecto.
        </div>
      </SuperCrosses>

      <SuperCrosses crosses={crosses}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ea
          facilis explicabo consequuntur dolorem. Doloribus nobis illo optio
          sunt corporis.
        </div>
      </SuperCrosses>
      <SuperCrosses crosses={crosses}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad illum non
          nostrum aspernatur esse incidunt neque delectus tempore mollitia eos!
        </div>
      </SuperCrosses> */}
      <Modal>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="pass" />
        <button>send</button>
      </Modal>
      <Modal>
        <h2>Confident Information</h2>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="pass" />
        <input type="text" placeholder="pass" />
        <div>
          <label>
            <input type="checkbox" /> I agree
          </label>
        </div>
        <button>send</button>
      </Modal>
    </div>
  );
};
