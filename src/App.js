import React from "react";
import { Layout } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import MainContent from "./components/MainContent";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header
          style={{
            color: "white",
            backgroundColor: "#24292E",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <ThunderboltOutlined style={{ paddingRight: 10 }} />
          Classic Cryptography Encryptor
        </Header>
        <Content
          style={{
            minHeight: "calc(100vh - 70px - 64px)",
            background: "white",
            padding: "20px",
          }}
        >
          <MainContent />
        </Content>
        <Footer style={{ textAlign: "center", background: "#F7F7F7" }}>
          © <b>IF4020 Kriptografi</b>. Created by{" "}
          <b>Lukas Kurnia Jonathan (006)</b> and <b>Rika Dewi (147)</b>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
