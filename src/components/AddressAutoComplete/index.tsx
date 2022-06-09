/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./styles.scss";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";


export interface FormInfoProps {
    "address-autocomplete": string;
    street: string;
    zip: string;
    city: string;
    country: string;
}

interface AutocompleteProps {
    fontSize?: "sm" | "md" | "lg";
    updateValue: (val : FormInfoProps) => void;
}

function handleScriptLoad(updateQuery : Dispatch<SetStateAction<string>>, autoCompleteRef : React.RefObject<HTMLInputElement>, updateFormInfo : Dispatch<SetStateAction<FormInfoProps>>, updateValue: (val : FormInfoProps) => void) {
    if (autoCompleteRef.current) {
        const autoComplete = new google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {
                fields: ["formatted_address", "geometry", "address_components"],
            }
        );
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(autoComplete, updateQuery, updateFormInfo, updateValue)
        );
    }
}

async function handlePlaceSelect(autoComplete : google.maps.places.Autocomplete, updateQuery : Dispatch<SetStateAction<string>>, updateFormInfo : Dispatch<SetStateAction<FormInfoProps>>, updateValue: (val : FormInfoProps) => void) {
    const infoTemp : FormInfoProps = {"address-autocomplete": "", street: "", zip: "", city: "", country: ""};
    const addressObject : google.maps.places.PlaceResult = autoComplete.getPlace();
    const query = addressObject.formatted_address;

    if (query) {
        const addressComponents = addressObject.address_components;
        const location = addressObject.geometry?.location;
        updateQuery(query);
        const mapDiv = document.getElementById("map");
        if (mapDiv && location) {
            const mapCanvas = new google.maps.Map(mapDiv, {
                center: { lat: location?.lat(), lng: location?.lng() },
                zoom: 17,
                mapTypeId: "roadmap",
                mapTypeControl: false,
            });

            const marker = new google.maps.Marker({
                position: { lat: location.lat(), lng: location.lng() },
                title: ""
            });
            marker.setMap(mapCanvas);
        }
        infoTemp["address-autocomplete"] = query;
        addressComponents?.forEach((addComponent) => {
            if (addComponent.types.indexOf("postal_code") !== -1) {
                infoTemp.zip = addComponent.long_name;
            }
            if (addComponent.types.indexOf("country") !== -1) {
                infoTemp.country = addComponent.long_name;
            }
            if (addComponent.types.indexOf("route") !== -1) {
                infoTemp.street = addComponent.long_name;
            }
            if (addComponent.types.indexOf("postal_town") !== -1 || addComponent.types.indexOf("locality") !== -1) {
                infoTemp.city = addComponent.long_name;
            }
        });
        updateFormInfo(infoTemp);
        updateValue(infoTemp);
    }
}

export default function AddressAutoComplete({updateValue, fontSize = "lg"}: AutocompleteProps) {
    switch (fontSize) {
    case "sm": {
        document.documentElement.style.fontSize = "12px";
        break;
    }
    
    case "md": {
        document.documentElement.style.fontSize = "15px";
        break;
    }
    
    case "lg": {
        document.documentElement.style.fontSize = "18px";
        break;
    }
    }
    const initialData : FormInfoProps = {"address-autocomplete": "", street: "", zip: "", city: "", country: ""};
    const [query, setQuery] = useState<string>("");
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [formInfo, setFormInfo] = useState<FormInfoProps>(initialData);
    const autoCompleteRef = useRef(null);

    const validationSchema = Yup.object().shape({
        street: Yup.string()
            .min(2, "The street name is too short")
            .max(50, "The street name is too short")
            .required("Required"),
    });

    useEffect(() => {
        let loader : Loader | undefined = undefined;
        if (!loader && query !== "") {
            loader = new Loader({
                apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
                libraries: ["places"]
            });
        }

        if (!!loader && autoCompleteRef) {
            loader.load()
                .then(() => {
                    handleScriptLoad(setQuery, autoCompleteRef, setFormInfo, updateValue);
                })
                .catch(e => {
                    console.log("Cannot load the Google Map script" + e);
                });
        }
        
    }, [query, updateValue]);

    return (
        <div className="address-autocomplete">
            <input
                className="autocomplete-input"
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Input a place"
                value={query}
                style={{visibility: formOpen ? "hidden" : "visible"}}
            />
            
            <div className="autocomplete-edit-container">
                {!formOpen &&
                    <>
                        Can&apos;t find your address?&nbsp;
                        <span className="autocomplete-edit-button" onClick={() => setFormOpen(!formOpen)} data-testid="autocomplete-edit-button">Edit</span>
                    </>
                }
                {formOpen &&
                    <>
                        Return to&nbsp;
                        <span className="autocomplete-edit-button" onClick={() => setFormOpen(!formOpen)} data-testid="autocomplete-back-button">address search</span>
                    </>
                }
            </div>
            
            {formOpen &&
                <div className="autocomplete-form" data-testid="autocomplete-form">
                    <Formik initialValues={formInfo} onSubmit={values => updateValue(values)} validationSchema={validationSchema}>
                        {({handleSubmit, handleChange, values, errors}) => 
                            <Form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <label htmlFor="street" className="autocomplete-form-label">Street</label>
                                    <Field
                                        className="autocomplete-form-input"
                                        id="street" 
                                        name="street"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.street}
                                        data-testid="autocomplete-input-street"
                                    />
                                    <div className="autocomplete-form-error" style={{ visibility: errors.street ? "visible" : "hidden" }}>{errors.street}</div>
                                </div> 

                                <div className="autocomplete-inline-block">
                                    <div className="input-container" style={{ width: "40%", marginRight: "10px" }}>
                                        <label htmlFor="zip" className="autocomplete-form-label">Zip Code</label>
                                        <Field 
                                            className="autocomplete-form-input"
                                            id="zip" 
                                            name="zip"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.zip}
                                            data-testid="autocomplete-input-zip"
                                        />
                                        <div className="autocomplete-form-error" style={{ visibility: errors.zip ? "visible" : "hidden" }}>{errors.zip}</div>
                                    </div>

                                    <div className="input-container" style={{ width: "60%", marginLeft: "10px" }}>
                                        <label htmlFor="city" className="autocomplete-form-label">City</label>
                                        <Field 
                                            className="autocomplete-form-input"
                                            id="city" 
                                            name="city"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.city}
                                            data-testid="autocomplete-input-city"
                                        />
                                        <div className="autocomplete-form-error" style={{ visibility: errors.city ? "visible" : "hidden" }}>{errors.city}</div>
                                    </div>
                                </div>
                                
                                <div className="input-container">
                                    <label htmlFor="country" className="autocomplete-form-label">Country</label>
                                    <Field 
                                        className="autocomplete-form-input"
                                        id="country" 
                                        name="country"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.country}
                                        data-testid="autocomplete-input-country"
                                    />
                                    <div className="autocomplete-form-error" style={{ visibility: errors.country ? "visible" : "hidden" }}>{errors.country}</div>
                                </div>
                                <button type="submit" data-testid={"autocomplete-form-submit"}>Submit</button>
                            </Form>
                        }
                    </Formik>
                </div>
            }
            
            <div className="auto-complete-result" style={{ height: query ? "250px" : "0", display: formOpen ? "none" : "flex" }}>
                <div className="auto-complete-result-text">
                    {formInfo["address-autocomplete"] !== "" && <div className="auto-complete-result-title">Address</div>}
                    <div className="auto-complete-result-content">
                        <div>{formInfo.street}</div>
                        <div>{formInfo.zip + " " + formInfo.city}</div>
                        <div>{formInfo.country}</div>
                    </div>
                </div>
                <div className="auto-complete-result-map" id="map" />
            </div>
        </div>
    );
}