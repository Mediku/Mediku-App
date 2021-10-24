import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pages.scss";
import image from "../assets/images/doctor.png";
import { Link } from "react-router-dom";
import { dataClinicAsync } from "../store/action/index";
import Map from "./../components/Map";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataClinicAsync());
  }, [dispatch]);
  const dataClinic = useSelector((state) => state.dataClinic);
  const clinicList = dataClinic.list;
  return (
    <div className="all-container">
      <div className="landing-container">
        <div className="container">
          <div className="text-landing-page">
            <h2 className="heading">We provide PCR and Antigen Test for you</h2>
            <h2 className="text">
              Mediku provides nearest clinics around you that provides rapid
              COVID test services that you can get, just by online registration
              and choose time by your own schedule, you can receive your test
              result within few hours via email. We make sure people can have
              the easiest way to get the COVID test they wanted.
            </h2>{" "}
            <br />
            <Link
              className="router button button-grow button-landing"
              to="/register"
            >
              Book a test
            </Link>
          </div>
          <div className="photo-landing-page">
            <img src={image} style={{ zIndex: -1 }} alt="" />
          </div>
        </div>
      </div>

      <section>
        <div className="box-container">
          <div className="box1">
            <div className="text">
              <h2>
                <i className="fas fa-map-marked-alt"></i> Location drive-thru
              </h2>
              <p>Choose you nearest clinic's location to your house.</p>
            </div>
          </div>
          <div className="box2">
            <div className="text">
              <h2>
                <i className="fas fa-store"></i> Home & Corporate service
              </h2>
              <p>
                Choose between home or corporate service
              </p>
            </div>
          </div>
          <div className="box3">
            <div className="text">
              <h2>
                <i className="fas fa-history"></i> Fast Response
              </h2>
              <p>You can receive your test result within few hours.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="steps flex items-center min-h-screen justify-center">
        <div className="flex-box">
          <div className="text-bar">
            <h2>
              Easy steps to do SWAB Test with{" "}
              <span className="mediku">Mediku</span>
            </h2>
            <p>
              Choose your own schedule to do SWAB test with the easiest way and
              fast with mediku. Get your result within 16 hours.
            </p>
          </div>
          <div className="grid-box grid grid-cols-4 gap-5">
            <div className="step-1 row-span-2 col-span-2 bg-gray-500 rounded">
              <p>Online Registration</p>
            </div>

            <div className="step-2 col-span-2 bg-gray-500rounded">
              <p>Choose Date</p>
            </div>
            <div className="step-3 bg-gray-500 rounded">
              <p>SWAB TEST</p>
            </div>
            <div className="step-4 bg-gray-500 rounded">
              <p>Confirmation</p>
            </div>
          </div>
        </div>
      </div>
      <div className="location-bar">
        <div className="text">
          <h2>Our Locations</h2>
          <p>Do swab test drive-thru & walk-in in various places</p>
        </div>
        <div className="location-card">
          <div className="locations-list">
            <div className="daftar-lokasi">
              <p>Locations</p>
            </div>
            {clinicList?.map((clinic) => {
              return (
                <div key={clinic.id}>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {clinic.name}
                  </p>
                  <p>
                    <i className="fab fa-whatsapp"> {clinic.phone_number}</i>
                  </p>
                </div>
              );
            })}
          </div>
          <div id="map">
            <Map></Map>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
