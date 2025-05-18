"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Container from "@/components/Container";
import { API_IP, BLUE_COLOR, CONFIG, DARK_BLUE_COLOR, LIGHT_BLUE_COLOR, RED_COLOR, WHITE_COLOR, YELLOW_COLOR } from "@/components/Constant";
import { useEffect, useState } from 'react';
import { MdDownloadForOffline } from "react-icons/md";
import { IoLogoDropbox } from "react-icons/io";
import axios from 'axios';

const mockUser = {
    user_id: 1,
    name: 'ข้าเจ้าคือสาวเจียงใหม่',
    subject_code: "TH112",
};

const mockSheet = [
    {
        sheet_id: 1,
        name: 'อ่านอย่างไรให้เข้าใจ',
        subject_code: "TH112",
        image: 'sheet1.svg',
        pdf: 'test_sheet.pdf',
    },
    {
        sheet_id: 2,
        name: 'เขียนกันเถอะ',
        subject_code: "CN101",
        image: 'sheet1.svg',
        pdf: 'test_sheet.pdf',
    },
]

const initSheet = [
    {
        sheet_id: 0,
        name: 'ไม่ม่ชื่อ',
        subject_code: "aa111",
        image: 'sheet1.svg',
        pdf: 'test_sheet.pdf',
    },

]

export default function Dashboard() {
    const router = useRouter();

    const [user, setUser] = useState(mockUser);
    const [sheet, setSheet] = useState(initSheet);
    const [searchText, setSearchText] = useState('');

    const filteredSheets = sheet.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.subject_code.toLowerCase().includes(searchText.toLowerCase())
    );


    const [sheets, setSheets] = useState(initSheet);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        if (typeof window === "undefined") return; // แก้สำหรับ SSR

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axios.post(API_IP + `/api/dashboard/`, null, config);
            console.log('sheet:', res.data);
            setSheet(res.data.sheets); // <- ระวังชื่อ key ต้องตรงกับ API
        } catch (err) {
            console.error('can not get sheet:', err);
        }

        try {
            const res = await axios.get(API_IP + `/api/my_cart/`, config);
            console.log('cart:', res.data);
            setUser(res.data.user)
        } catch (err) {
            console.error('can not get subject:', err);
        }

    };

    const onLogout = async () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        };

        await axios.post(API_IP + "/api/logout/", null, config)
            .then(res => {
                console.log(res.data);
                localStorage.removeItem('token');
                alert("ออกจากระบบเรียบร้อย");
                router.push("/login");
            })
            .catch(err => {
                console.error(err);
                if (err.response.data.detail === 'Invalid token.' || err.response.data.detail === 'Token has expired.') {
                    alert("เกิดข้อผิดพลาดบางอย่าง");
                }
                router.push('/login');
            })
    }

    const renderSheetCard = (sheet) => (
        <div
            key={sheet.sheet_id || initSheet[0].sheet_id}
            className="sheet-card"
            style={{
                backgroundColor: YELLOW_COLOR,
                color: WHITE_COLOR,
                display: "flex",
                flexDirection: "column",
                fontWeight: "bold",
                width: "200px",
                position: "relative", // สำคัญสำหรับปุ่มดาวน์โหลดที่ลอยอยู่
            }}
        >
            <div className="contend">
                <div>
                    <Image
                        src={`/${sheet.image || initSheet[0].image}`}
                        alt="sheet"
                        width={200}
                        height={200}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '8px',

                        }}
                    />
                </div>

                <div style={{
                    backgroundColor: DARK_BLUE_COLOR,
                    color: "white",
                    width: "100%",
                    padding: "10px",

                    display: 'grid',
                    gap: '10px'
                }}>
                    <h4 style={{}}>{sheet.subject_code || initSheet[0].subject_code}</h4>
                    <p style={{}}>{sheet.name || initSheet[0].name}</p>
                </div>
            </div>


            {/* ✅ ปุ่มดาวน์โหลด (ลอย) */}
            <div className="download-button">
                <a
                    href={`/pdfs/${sheet.pdf || initSheet[0].pdf}`}
                    download
                    target="_blank"
                >
                    <MdDownloadForOffline size={200} color={BLUE_COLOR} />
                </a>
            </div>

            <style jsx>{`
                .sheet-card {
                    position: relative;
                    transition: transform 0.2s;
                    box-shadow: 3px 3px 10px 3px #dddddd;
                    overflow: hidden;
                }

                .sheet-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(128, 128, 128, 0); /* เริ่มโปร่งใส */
                    transition: background-color 0.3s ease;
                    z-index: 1; /* อยู่ใต้ปุ่มดาวน์โหลด */
                }

                .sheet-card:hover::before {
                    background-color: rgba(128, 128, 128, 0.4); /* เทาทับเมื่อ hover */
                }

                .download-button {
                    display: none;
                    position: absolute;
                    top: 20%;
                    left: 20%;
                    transform: translate(-50%, -50%);
                    scale: 0.4;
                    background-color: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 2;
                }

                .sheet-card:hover .download-button {
                    display: block;
                }
            `}</style>

        </div>
    );


    return (
        <div>
            <Container>

                <div style={{
                    marginTop: "5%",
                    marginInline: "10%",
                }}>
                    {/* หัวเรื่อง Dashboard */}
                    <h1 style={{ marginBottom: '10px', fontSize: "500%" }}>
                        {'Dashboard'}
                    </h1>

                    {/* ชื่อผู้ใช้ชิดขวา */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        width: '100%',
                        // backgroundColor:'green'
                    }}>

                        <button
                            onClick={() => { onLogout() }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: RED_COLOR,
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                // width: "100%",
                                height: "10%",

                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-start',
                                padding: '10px',
                                // backgroundColor:'red'
                            }}
                        >
                            ออกจากระบบ
                        </button>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '5px',
                    }}>
                        <h2 style={{ margin: 0, fontWeight: 'bold' }}>สวัสดี {user.username || mockUser.name}</h2>
                    </div>

                    {/* ช่องค้นหา */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '20px',
                    }}>
                        <input
                            type='text'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder='ค้นหา'
                            style={{
                                padding: "10px 16px",
                                borderRadius: "25px",
                                border: "1px solid #ccc",
                                fontSize: "1rem",
                                width: "30%",
                                outline: "none",
                            }}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        // justifyContent: 'space-evenly',
                        justifyContent: 'space-around',
                    }}>
                        {filteredSheets.length !== 0 ? (
                            filteredSheets.map(renderSheetCard)
                        ) : (
                            <div
                                style={{
                                    // backgroundColor: 'red',
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        // backgroundColor: 'green',
                                        opacity: "0.6",
                                        color: DARK_BLUE_COLOR,
                                        width: "100%",
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }} >
                                        <IoLogoDropbox size="50%"
                                            style={{
                                                width: "50%"
                                            }} />
                                    </div>
                                    <h1 style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        opacity: "0.6",
                                        color: DARK_BLUE_COLOR,
                                    }}>ไม่พบข้อมูล</h1>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </Container>
        </div>
    );
}