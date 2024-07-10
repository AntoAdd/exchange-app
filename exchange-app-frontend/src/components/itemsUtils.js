import axios from "axios";

export async function getUserItems() {
  let items = await axios({
    method: "get",
    url: "http://localhost:8080/items/user-items",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return items;
};
