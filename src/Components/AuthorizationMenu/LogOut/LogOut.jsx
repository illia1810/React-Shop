import React, {useState} from 'react';
import "./LogOut.css";
import {users} from "../../../Users";

const LogOut = ({setUser, authorizationStatus, setAuthorizationStatus, onClose}) => {


    const [formState, setFormState] = useState({
        fields: {
            login: "",
            password: "",
        },
        errors: {
            login: "",
            password: ""
        },
        isValid: false
    });

    const handleChange = ({target: {name, value = ""}}) => {
        setFormState((prev) => {
            return {
                ...prev,
                fields: {
                    ...prev.fields,
                    [name]: value,
                },
                errors: {
                    ...prev.errors,
                    [name]: "",
                }
            }
        })
    }

    const handleBlur = ({target:{name, value}}) => {
        if(value) {
            setFormState((prev) => {
                return {
                    ...prev,
                    errors: {
                        ...prev.errors,
                        [name]: "",
                    }
                }
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formValidator();
        if (formState.isValid) {
            let user = users.find(user => user.login === formState.fields.login)
            setUser(() => {
                return {
                    isLoggedIn: true,
                    isAdmin: user.role === "admin"
                }
            })
            setAuthorizationStatus(!authorizationStatus);
        }
    }

    const formValidator = () => {
        for (let [key, value] of Object.entries(formState.fields)) {
            if (key === "login" && value === "") {
                setFormState((prev) => {
                    return {
                        ...prev,
                        errors: {
                            ...prev.errors,
                            login: "Fill this field."
                        }
                    }
                })
            }
            if (key === "password" && value === "") {
                setFormState((prev) => {
                    return {
                        ...prev,
                        errors: {
                            ...prev.errors,
                            password: "Fill this field."
                        }
                    }
                })
            }
            if (key === "login" && value.length > 0 && !users.find(user => user.login === value)) {
                setFormState((prev) => {
                    return {
                        ...prev,
                        errors: {
                            ...prev.errors,
                            [key]: "Username is incorrect."
                        }
                    }
                })
            }
            if (key === "password" && value.length > 0 && !users.find(user => user.password === value)) {
                setFormState((prev) => {
                    return {
                        ...prev,
                        errors: {
                            ...prev.errors,
                            [key]: "Password is incorrect."
                        }
                    }
                })
            }
        }
        setFormState((prev) => {
            if(Object.values(prev.errors).every(field => field === "")) {
                return {
                    ...prev,
                    fields: {
                        ...prev.fields
                    },
                    isValid: true
                }
            }
            return {
                ...prev
            }
        })
    }

    return (
        <div className="modal-menu">
            <form className="form" onSubmit={handleSubmit}>
                <h4>Authorization</h4>
                <label className="input-label">
                    Username:
                    <input name="login" value={formState.fields.login}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           className="input"
                           type="text"/>
                    {formState.errors.login ?
                        <span className="error-message">{formState.errors.login}</span> : ""}
                </label>
                <label className="input-label">
                    Password:
                    <input name="password"
                           value={formState.fields.password}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           className="input"
                           type="password"/>
                    {formState.errors.password ?
                        <span className="error-message">{formState.errors.password}</span> : ""}
                </label>
                <button type="submit" className="send-btn">Login</button>
                <div onClick={onClose} className="close-btn">
                    <img className="close-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8BAAIAAAD8/Pzy8vJeXl5aWlv19fVkZGT6+vpXV1fa2tpcXF27u7vu7u5fX1+hoaEwLzATExTZ2dlSUlIJCArS0tKpqamzs7N4eHji4uLKysqOjo5AQEBHR0cdHB0mJid9fX5sbGw6OjuGhoZDQ0OYmJkeHh4oKClNTU7Dw8OlpaaTk5Ourq82NTaDOP1sAAAOGUlEQVR4nM1d60LqMAyWMkVAYKADxv2ioHL0/R/vMMZlG0uapCn4/Txnbv1o0lyatA8PvlGvNVuDcBI3pt3FvBdVot580Z024kk4aDVrde/f94n2qDVZTSODoTJdTVqj9r2HKkBzGM/mJxYwjk/0Zqvh672HzEAzfIqs3K55Ro2wee+hExC0ljx2eZaVZSu4NwUM7WFHwK3I8/Hnj6plffjkSO9C8mn499bY11gimgjJuH9vSlkEu6kevTPHdfhXVHL0HunSu5B8H92b3B7NZx/0ziSf720m+1/++B05zu6pkP2OX35Hji/34jjyKJ8Fjo/3cHZq77fhd+S4rN2a4OB2/I4cd9Vb8utPb8ov5bi+oToub84v5bi80TSObyugWYrm+wb8avGd+KUcV95XnP7nHQkmFBdjvwT/3ZVfynHikV/74+4EE4pTbxHyOLo/vwTGeJLU0GUCyxKJDi8LfRB8Fo4pSyqK5ot5FDnzNKajbhqDX8lgDhzm07fV5ns8agen5Es9aI/6rc3qbd0TsjSmq5wAaC7YwziMfRoPmti60G7u4rWIpdmqxhtj5ggOY/7djEnmuVobb7p8lqrrzZD38UThXoY8KQqGL9xsjzFDLYI/nC8fMoG0ySugNo55E2nMjw7BHf2ryQg/BnKDHAw+OCSVrMaGRXDpqv+jJYvivxsS3A9su9FIxtfDLZmkAkWyiBrzudOKbOo7cgTjLKjURcaY3lDTy6gOe+QvOy03RDOxF6qNFrczNkRRdTIaNEOfmAcf8Uw7pnF0MP1N4ge85d37M+IIhAt4QPFFjZrZLcUPaRrNQuaG/5IIfvndkm5/kSj+Spa5ZxJBL6FoDqTA2zz7ebH5usUO5uiLMBL+T01aRk3HB6MrdEjSxFxQ27Sk000oUggmFHkLwgfVoRDIPxPU/JCZct76j16v9eiL2RGP9NoxhhPe58QvT/7Y7fHEGQrZ86h9sgJtn4LKSmGaT2pwEzPTJf4oMnO0Jqa9lp9Y8yWoDBE9joRmMgSFky9eCL4IRkLx3pb8FLQfQZVsI5il/b2MdTRLUd/0d2QDsa+nU9Feib4ucnXwNJC17cUD4aaX9iyKZvAwkAH+4pp4W09XF6Vbeck4cKP4Lt+31FxR+atoZhzoYjNy25nV0kWhDp6GgQWtlLgee7eOoMpFNB0GMgrcUti/q0ORQNAyTthioLGmmTWsn9YQVLuI7jUeTWzAyzo6hUlS8o3wcdd40R4PJj8jumDAk4j9MIe8fZXy+7oJql1E0zoMNFFmvspfjqa4zSx5pPpGUBEX02839PsZPHjX+HSUJ8GxhfSc57EnaF10kSIjb+mjbXQ+SgUJE21z8YUog5DOImUGz24FtvFXbhMxd8Z8nB/b66JlFGJdpOjg4yUAROX0/fr1AZIhzS1OVXsKWiaoDBE9AFv6TXS9V7PDfpFV7lGK0eBTpBBs5P4CyyeZ3dUHkLiwmE72YjRIZiL/J9hic50ffsWeLqZaqw11XaQQfCkmYTbYrBRbwpAZN9H1gLQFlS+iB8yRURcyi3VsCss2eSk+Kt1osMxEBkglhTF18qOLsjIgVaNBddWuRwFn54slGsh4gb1HkgNHc8MpznaJiCZA0kp5LUFWJTOH8h5aDhzXDmZRh6sp8hYAFlKsFkjHaJA8GfCv4RgjL6Zw6IulrlR0UWQmMmNApC+z0gXIY+h2jrvRcBHRA2B32piL59ZCnsJ7qSkUsSSjPW0ILjJHICGRaZ2fgjdjbEnyKmWIsKCKzUQGM3jwl8wpHFaUOLAFihQHDjL99IgewQ88+LMz1iSuuOWQ66LQVSsACfvOyYwQfmSFvpw+0LJZlLpqRcAu9dlZARd9WleqUBc1dPAAeFf+LDvgNJdFymUUJXlUB1etgHoPHn/6BJxFJH5CoovOdjADMEl4yioiLhu5OJYrqG6uWgGgOT85bqCmMorhmIkNZlbNAnhb9+iRgSbTfFK/8cATVB0zccEaZHDI1LfBVACvxYAS9aeLP0WkWbk60NyZeSKFsGPHK0qtUlbHRFDVzMQZfVjPktw3oqe8CvgqLXej4qrlgShi4nxPwP9lF8BTdNHeXkA3E2fAS0lyPMHKshBxQKihUMvuZAEGRwe3E0x2CzoNCA4cgSC/dwKML5LUdx3y2WzBbznsgmojyBbRB8QtM1Ed1lITibph7MsNTpBjB88IIIuXpJnA4FDWacMpPS8bkHBzFVa1JmIsgO1+GwgOHEwQyaqhADMNe3MBZo1J0W8ppLooFNEEsG89QDweeQ+xbBZdShxgFiFi8Fv2FwMgOHBlBB3OK/kG18sJOL9Ox04QHLjr74lF9AHZ09+7LZCOiltPU3B1UWYHzwDDh/3vBq2zeJmmHTzvxrUeDtw82zs1XZChW/srSxdFrloWsN/SfYA24Gz10nbQBdVRRBOADBfgZr8xrh8lO3Bui0wK0LueP0DJxrIKDCaqtJYClWOtQBo9mHzP+atJMEVhKHXVsgCVLXqAQlKzdf8sqUtMQR32ABfMitc5pNX+q3TbIHPoUQ+JbQUqFf6IHnpcS6kWUaPbBllL/dlDeoSh0MSA2ENfPg2r88VZUDGfxpdfymvtcaWI+aWeYgt+k7KToGKxhZf4UJCOcosusPjQR4wva1J2EVQsxoczHPLju2Qtri7dNliexkOuTZrad9BFLNcG50ulMZtLD690FrF8KZzztvZ9axN00EUs5w3byp7I5LvtPgkduGCLeGZ1MHwSGUSnJuWKVBdhc1ipYxNsq0ssgWOTckUoqOj+oeoeMKVJ2QdFfA8YNvlrbnaBUkZC2cdnCyq+j4/UYjDjJ1qVBaVciOnAWWoxtOppqKVcjoXTZbDU07Th4kWW30aZwUYi98S6GwZgny21eLAQdxlfoczMyUvS7nyDzcGhrg1ZTBlFUaTGkPPTui2aiBqmvjVSX0o+oZfZ+aLbhWqtL4XbR8kuFEdEU2gKKlIjfCwJQuq8afZCUrOtR9Fe542EHjR7Iar41TMaSK3+6WdF+i0ojhuFYEk5pZrRQHqaTpV5WM+MfTWliGh5MK0jqAEopJeeGXD/qWI9G4w4g8DfqpyxMYQHXzk/hMyz7WBXp6p7FV2ED7HI9K5h/Yd4GExx1d6QDlD3U4to/YdYDyl6+hnfDhbhrIu0HtL9agE/hlzKwXPV5D8SIqhYH3B28pEuRSTAcGxSPg7RzYFDzovK9TRh/fhbyK9xF9EULoJK7scXnKlAiwcJBDndNlcYIFOT/1XY52LoiGgKudGoQvu7l7jiBPbZJhSCDWomS+zAtZCJKS6RzPNptHTwBKEuMs6nwY+VulpOXVy1cogcODhkqJScLAj28F2tSqo6eAKhQOxKFxFHpWxfCfk9ijNOctVY/B6IDlx+RV1iDK8tAPqD5KZcHi7h4OoienhXWdiHnrk3uzyn4aqVgms0sEOOys7cs5ybeLYYwoieRJHlwGH3iQHFQKSzL7XNRB4MQcW0CjpKGJPrk5ySNl/EBGkO3OPxx8CeARoL4ZNeTjGGbh99Cci6iN5amF02crCeI6zqqgEUaQ6c8BxhJBBO/m5GIejcVkDSxQ56WByS93A/z1vj4HlCsYNlnMgNELTLoxCCGvdYOrRopsPAEpCO5+q7i2gKp3ZpS3pQcAXL5c3unS8aFC0Xsbjcb+HYnJWFQ1+/tb5CfkeJ0FUDKIqb3u11TkiciBLU0sEThIJKKAIS3hWkf6mVaEUl3b0muu9JUQdPEOki5b4nLE8OEtRbRbMDsZ9yez0S0i8NVoWDr9XWwRP47dKUE/QekAIb4LX+LnlkCiq5NJ101fGFoIqrVg7CKbfZodAvPmbcD+hPRFMwBJXVAwPWnF6/1e8lnZzzbg61pGQQ75dTaVLGQTYazN4C9I6TzFtVXbVyEE65TX9sZmsB7U5nP3dXFkFZbsiG4oI/dC83wfJjm/EgaLdh+79bHc2qnQciaSdC9lezFL8cm2ktCEhrqemK1gOw1SZPkX6MqwBDe/NCMoit8GdGL/HKcPwi3xbNxCvN3svOzjuA5tvsf+bYh6gGS9IE8nyZIrD9nTxHecMphJDG76roggns6q/8Z+ZD1TxNa0smaC0QxUFaq9Mvfe6QEjgW6oMu/bPO9mpD/5bZhhocq+GCOH/JR+Xn5p1BpngguXT1ckbvhPY2VYIMQT1QNB8/vOOHswiGXwx+ei4Vdbk5kazEY8m5KPVxHDHoKSwyFxCNRoZkrzPkzWSt9dxj0XM2E3kw0honjsb8hsSprPXDKaW5tPgNl4M7rtDkJKcyLKfxoIn5O8HoZznjs0tev3U6e6VkKL+yJPse8/VbvPnuj9rBySeoBu1R/zuMG9OtiF3y4q6+oyhtRDcZRL3t57YXZf9J+E4v+SFK1E/i6cLt+DJ9N/iAsb2Z/iYQ5GSoaE/dagiU+K19phX+3Z2i4SV++eh/3pWjMQtVK1iGWnxHisas5E4vHWOnddCJn78lJo8qVmDtk+DS/x7CCf31zTnul1BfKb1yDG4rqvuv7W43gSlqxFyfEr+l60mcEoyeb8Nx/5WOchxBRr/jn+P+C4+3VcACxy+/HPdvn92TX4KmR1ndv/lZvCWhiNE7L4FEp2feb7EDS0Gwm7oFfKX01uEtPDQyXmPHqLbIL763+l2jPnxS4Zi85GmotQWijPaw40gy+fPHH78b544IWstIlIY5/tGy9aeUD0AzfOKxPCbiGuG9XBcJmsN4Nrcn1Y5P9Gar4V8wfFy0R63JaprLjl6nFKerSWv0pxXPinqt2RqEk7gx7S7mvagS9eaL7rQRT8JBq1nzv2b+B9Px19mZSYAvAAAAAElFTkSuQmCC" alt="close-img" />
                </div>
            </form>
        </div>
    );
};

export default LogOut;