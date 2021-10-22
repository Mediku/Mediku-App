import React, { useEffect } from "react";
import "./Pages.scss";
import { useDispatch, useSelector } from "react-redux";
import { dataRegistrationAsync, getEndpoint } from "../store/action/index";
import Swal from "sweetalert2";

function History() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataRegistrationAsync());
  }, [dispatch]);
  const dataRegistrations = useSelector((state) => state.dataRegistrations);
  const sitePayment = useSelector((state) => state.sitePayment);

  const goToPaymentSite = async (id) => {
    await dispatch(getEndpoint(id));
    if (sitePayment.invoiceURL && sitePayment.invoiceID) {
      await Swal.fire({
        icon: "info",
        title: "IMPORTANT!!",
        text: `Please memorize your payment ID : ${sitePayment.invoiceID}, you will need this ID to confirming your payment after you paid it`,
      });
      await window.open(`${sitePayment.invoiceURL}`);
    }
  };

  const confirmPayment = async (id) => {
    await Swal.fire({
      title: "Please submit your Invoice ID to verify your payment",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (invoiceID) => {
        return fetch(`http://localhost:9000/xendits/invoice/${id}/status`, {
          method: "PATCH",
          body: JSON.stringify({
            invoiceID: invoiceID,
          }),
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            for (let q = 0; q < data.message.length; q++) {
              if (data.message[0] === "s") {
                Swal.fire(
                  "Are you sure you already paid for that?",
                  "Cause the systems detect that you never paid for that",
                  "question"
                );
              } else if (data.message[0] === "H") {
                Swal.fire({
                  icon: "success",
                  title: "Thankyou for confirming your payment",
                  text: "Your payment is confirmed by system and we will send a confirmation email to the Clinic by now",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Invoice ID that you submited is not exists",
                });
              }
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    await dispatch(dataRegistrationAsync());
  };

  return (
    <div>
      <div className="history-container">
        <h1>Your Registration's List</h1>
        <div className="grid-template">
          {dataRegistrations?.map((data) => {
            return (
              <div
                key={data.id}
                className="max-w-2xl bg-white border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg container-history"
              >
                <div id="header" className="flex items-center mb-4">
                  <img
                    alt="avatar"
                    className="w-20  border-2 border-gray-300"
                    src={data.Clinic.imageURL}
                  />
                  <div id="header-text" className="leading-6 ml-8 sm">
                    <h4 id="name" className="text-xl font-semibold">
                      {data.Clinic.name}
                    </h4>
                    <h5 id="job" className="font-semibold text-gray-600">
                      {data.Clinic.address}
                    </h5>
                  </div>
                </div>
                <div id="quote">
                  <p className=" text-gray-600">
                    name : {data.User.full_name} <br />
                    chosen service : {data.service_name} <br />
                    total price : RP. {data.total_price}
                  </p>
                  {data.is_paid === false ? (
                    <div>
                      <button
                        onClick={() => goToPaymentSite(data.id)}
                        className="button button-grow unpaid"
                      >
                        Pay now
                      </button>
                      <button
                        onClick={() => confirmPayment(data.id)}
                        className="button button-grow unpaid right bg-green-200"
                      >
                        Confirm payment
                      </button>
                    </div>
                  ) : (
                    <button disabled className="paid">
                      Paid
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default History;
