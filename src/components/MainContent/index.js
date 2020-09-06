import React, { useState } from "react";
import { Row, Col, Input, Select } from "antd";
import { postText } from "../../api/api";

const { TextArea } = Input;
const {Option} = Select
const MainContent = () => {
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  React.useEffect(() => {
    const request = postText(
      "negara peng",
      "sony",
      "vigenere_full",
      "decrypt",
      false
    );
    request
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(text);
  console.log(algorithm);
  return (
    <>
      <Row>
        <Col span={10}>
          <Row style={{ padding: 20 }}>
            <Col span={24} style={{marginBottom: 10}}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>Select Algorithm</b>
              </div>
              <Select
                defaultValue="vigenere"
                style={{ width: '100%' }}
                onChange={(value)=> setAlgorithm(value)}
              >
                <Option value="vigenere">Vigenere</Option>
                <Option value="vigenere_full">Full Vigenere</Option>
                <Option value="vigenere_auto">Auto-Key Vigenere</Option>
                <Option value="vigenere_extended">Extended Vigenere</Option>
                <Option value="playfair">Playfair</Option>
                <Option value="affine">Affine</Option>
                <Option value="hill">Hill</Option>
                <Option value="super">Super Encrption</Option>
                <Option value="enigma">Enigma</Option>
              </Select>
            </Col>
            <Col span={24}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>Input Plain Text</b>
              </div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="type yout plain text here!"
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            {/* <Col span={24}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>Input Plain Text</b>
              </div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="plain text here!"
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col span={24}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>Input Plain Text</b>
              </div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="plain text here!"
                onChange={(e) => setText(e.target.value)}
              />
            </Col> */}
          </Row>
        </Col>
        <Col span={14}></Col>
      </Row>
    </>
  );
};

export default MainContent;
