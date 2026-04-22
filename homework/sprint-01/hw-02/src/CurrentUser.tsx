import type { UserType } from "./HW2";

// type CurrentUserPropsType = {
//     user: UserType // пропиши типизацию
//   };


// export const CurrentUser = (props: CurrentUserPropsType) => {
//   return (
//     <li key={props.user.id} id={`hw02-user-${props.user.id}`}>
//       <strong>{props.user.name}</strong> (Age: {props.user.age})<strong> Address: </strong>
//       {props.user.address.street}, {props.user.address.city}
//     </li>
//   );
// };



  type CurrentUserPropsType = UserType

export const CurrentUser = (props: CurrentUserPropsType) => {
  return (
    <li id={`hw02-user-${props.id}`}>
      <strong>{props.name}</strong> (Age: {props.age})<strong> Address: </strong>
      {props.address.street}, {props.address.city}
    </li>
  );
};

