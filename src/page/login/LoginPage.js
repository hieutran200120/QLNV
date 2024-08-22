import React from 'react'
import bg34 from "../../img/bg34-1.png"
import login34 from "../../img/qr-login-34.png"
import "../../css/boostrap.min.css"
import './Login.css'
import { userApi } from '../../api/userApi'
import { useFormik } from "formik";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
const LoginPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema:
            Yup.object({
                userName: Yup.string()
                    .required("Vui lòng điền vào trường này ! "),
                password: Yup.string()
                    .required("Vui lòng điền vào trường này !")
            }),
        onSubmit: async (values) => {
            console.log(values)
            try {
                const res = await userApi.login(values)
                if (res) {
                    // sessionStorage.setItem("roles", JSON.stringify(res.roles));
                    sessionStorage.setItem("user", JSON.stringify(res))
                    sessionStorage.setItem("token", res.token)
                    message.success("Đăng nhập thành công")
                    navigate("/Home");
                    window.location.reload();
                } else {
                    message.error(res.message)
                }
            } catch (err) {
                console.log(err);
                message.error("Đăng nhập thất bại")
            }
        }
    });
    return (
        <section class="fxt-template-animation fxt-template-layout34" data-bg-image="img/bg1.png">
            <div class="fxt-shape">
                <div class="fxt-transformX-L-50 fxt-transition-delay-1">
                    <img src="img/shape1.png" alt="Shape" />
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="fxt-column-wrap justify-content-between">
                            <div class="fxt-animated-img">
                                <div class="fxt-transformX-L-50 fxt-transition-delay-10">
                                    <img src={bg34} alt="Animated Image" />
                                </div>
                            </div>
                            <div class="fxt-transformX-L-50 fxt-transition-delay-3">
                                <   a href="login-34.html" class="fxt-logo"><img src="img/logo-34.png" alt="Logo" /></a>
                            </div>
                            <div class="fxt-transformX-L-50 fxt-transition-delay-5">
                                <div class="fxt-middle-content">
                                    <h1 class="fxt-main-title">Sign In to Rechage Direct</h1>
                                    <div class="fxt-switcher-description1">If you don’t have an account You can<a href="register-34.html" class="fxt-switcher-text ms-2">Sign Up</a></div>
                                </div>
                            </div>
                            <div class="fxt-transformX-L-50 fxt-transition-delay-7">
                                <div class="fxt-qr-code">
                                    <img src={login34} alt="QR" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="fxt-column-wrap justify-content-center">
                            <div class="fxt-form">
                                <form className="infoform" onSubmit={formik.handleSubmit}>
                                    <div class="form-group">

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="userName"
                                            name="userName"
                                            value={formik.values.userName}
                                            onChange={formik.handleChange}
                                            placeholder="Enter your userName"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="password"
                                            id="Password"
                                            className="form-control"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            placeholder="********"
                                            required
                                        />
                                        <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                                    </div>
                                    <div class="form-group">
                                        <div class="fxt-switcher-description2 text-right">
                                            <a href="forgot-password-34.html" class="fxt-switcher-text">Recovery Password</a>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="fxt-btn-fill">Sign In</button>
                                    </div>
                                </form>
                            </div>
                            <div class="fxt-style-line">
                                <span>Or Continus with</span>
                            </div>
                            <ul class="fxt-socials">
                                <li class="fxt-google">
                                    <a href="#" title="google"><i class="fab fa-google-plus-g"></i></a>
                                </li>
                                <li class="fxt-apple">
                                    <a href="#" title="apple"><i class="fab fa-apple"></i></a>
                                </li>
                                <li class="fxt-facebook">
                                    <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage