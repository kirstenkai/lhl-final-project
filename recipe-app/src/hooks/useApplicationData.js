import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  return axios.get("/saved").then((response) => {
    return response.data;
  });
}
