import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { QUERY_WORK_ORDERS, QUERY_INV } from "../lib/queries";


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid white;
`;

export default function Home() {
}