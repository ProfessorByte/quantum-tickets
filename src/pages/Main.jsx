import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { db, dbData } from "../services/database";
import { useReducer } from "react";
import { useState } from "react";
import { SpinnerIcon } from "../assets/Icons";
import PropTypes from "prop-types";

const convertToMilitaryTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const militaryHours = hours < 10 ? `0${hours}` : hours.toString();
  const militaryMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return Number(militaryHours + militaryMinutes);
};

const getCurrentDate = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();

  return `${formattedDay}-${formattedMonth}-${year}`;
};

const initialState = {
  tickets: [],
  areTicketsLoading: true,
  currentTicket: null,
  isCurrentTicketLoading: true,
};

const ticketsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return {
        ...state,
        tickets: action.payload,
        areTicketsLoading: false,
      };
    case "SET_CURRENT_TICKET":
      return {
        ...state,
        currentTicket: action.payload,
        isCurrentTicketLoading: false,
      };
    default:
      return state;
  }
};

export const Main = ({ user }) => {
  const [
    { tickets, areTicketsLoading, currentTicket, isCurrentTicketLoading },
    dispatch,
  ] = useReducer(ticketsReducer, initialState);

  const [updatingCurrentTicket, setUpdatingCurrentTicket] = useState(false);

  useEffect(() => {
    const currentDate = getCurrentDate();

    const queryTickets = query(
      collection(dbData, "Appointments"),
      where("date", "==", currentDate)
    );
    const unsuscribe = onSnapshot(queryTickets, (querySnapshot) => {
      const ticketsData = querySnapshot.docs.map((doc) => ({
        cellphone: doc.id,
        militaryTime: convertToMilitaryTime(doc.data().time),
        ...doc.data(),
      }));

      ticketsData.sort((a, b) => a.militaryTime - b.militaryTime);
      dispatch({ type: "SET_TICKETS", payload: ticketsData });
    });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const unsuscribe = onSnapshot(
      doc(db, "currentData", "currentTicket"),
      (doc) => {
        dispatch({ type: "SET_CURRENT_TICKET", payload: doc.data() });
      }
    );

    return () => unsuscribe();
  }, []);

  const nextTicket = async (delayed) => {
    const index = tickets.findIndex(
      (ticket) => ticket.cellphone === currentTicket.cellphone
    );
    if (index === tickets.length - 1) {
      alert("No hay más tickets");
      return;
    }
    setUpdatingCurrentTicket(true);
    await setDoc(doc(db, "pastTickets", currentTicket.cellphone), {
      ...currentTicket,
      timestamp: new Date(),
      delayed: delayed,
    });
    if (index === -1) {
      await setDoc(doc(db, "currentData", "currentTicket"), {
        ...tickets[0],
      });
    } else {
      await setDoc(doc(db, "currentData", "currentTicket"), {
        ...tickets[index + 1],
      });
    }
    setUpdatingCurrentTicket(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)]">
      <section className="flex flex-col justify-center items-center bg-[#202123] p-6 rounded-3xl">
        <h1 className="font-[Michroma] text-3xl text-center mb-3">
          Quantum Tickets
        </h1>
        <span className=" text-gray-300">Ticket actual:</span>
        <div className="flex flex-col items-center justify-center m-6 p-6 bg-slate-900 rounded-3xl">
          {isCurrentTicketLoading ? (
            <SpinnerIcon />
          ) : (
            <>
              <span className="text-6xl">{currentTicket.ticket}</span>
              <div className="flex flex-col items-center justify-center text-lg mt-3">
                {!user ? (
                  <span>{currentTicket.Nombre.split(" ")[0]}</span>
                ) : (
                  <>
                    <span>{currentTicket.Nombre}</span>
                    <span>+{currentTicket.cellphone}</span>
                    <span>{currentTicket.time}</span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {!(
          areTicketsLoading ||
          isCurrentTicketLoading ||
          updatingCurrentTicket
        ) &&
          user && (
            <div className="flex gap-3">
              <button
                type="button"
                className="bg-green-600 p-3 rounded-md w-[50%] hover:bg-green-700"
                onClick={() => nextTicket(false)}
              >
                Siguiente ticket
              </button>
              <button
                type="button"
                className="bg-red-600 p-3 rounded-md w-[50%] hover:bg-red-700"
                onClick={() => nextTicket(true)}
              >
                Ticket con retraso
              </button>
            </div>
          )}
      </section>
    </div>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};
