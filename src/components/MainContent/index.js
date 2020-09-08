import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Radio,
  Card,
  Divider,
  Alert,
} from "antd";
import { postText, postFileBinary, postFileText } from "../../api/api";
import {
  groupString,
  createAffineKey,
  createHillKey,
} from "../../utils/helper";

const { TextArea } = Input;
const { Option } = Select;

const MainContent = () => {
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [key, setKey] = useState("");
  const [file, setFile] = useState(null);
  const [fileBinary, setFileBinary] = useState(null);
  const [display, setDisplay] = useState("no_space");
  const [isError, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isSave, setSave] = useState(false);
  const [mode, setMode] = useState("");
  const [_m, setM] = useState("");
  const [_b, setB] = useState("");

  useEffect(() => {
    if (_m && _b) {
      setKey(createAffineKey(_m, _b));
    }
  }, [_m, _b]);

  const handleEncrypt = (save) => {
    let _key = key;
    if (algorithm === "hill") {
      _key = createHillKey(key);
    }
    if (file) {
      postFileText(file, _key, algorithm, "encrypt", save)
        .then((res) => {
          if (!save) {
            setResult(res);
          } else {
            setSave(true);
          }
          setMode("encrypt");
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.response.data.result)
        });
    } else if (fileBinary) {
      postFileBinary(fileBinary, _key, algorithm, "encrypt", save)
        .then((res) => {
          if (!save) {
            setResult(res);
          } else {
            setSave(true);
          }
          setMode("encrypt");
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.response.data.result)
        });
    } else {
      postText(text, _key, algorithm, "encrypt", save)
        .then((res) => {
          if (!save) {
            setResult(res);
          } else {
            setSave(true);
          }
          setMode("encrypt");
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.response.data.result)
        });
    }
  };

  const handleDecrypt = (save) => {
    let _key = key;
    if (algorithm === "hill") {
      _key = createHillKey(key);
    }

    if (file) {
      postFileText(file, _key, algorithm, "decrypt", save)
        .then((res) => {
          if (!save) {
            setResult(res);
          } else {
            setSave(true);
          }
          setMode("decrypt");
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.response.data.result)
        });
    } else if (fileBinary) {
      // Special case: extended vigenere
      if (algorithm === "vigenere_extended" && mode !== "decrypt") {
        setResult("Press Save to see the result!");
        setMode("decrypt");
      } else {
        postFileBinary(fileBinary, _key, algorithm, "decrypt", save)
          .then((res) => {
            if (!save) {
              setResult(res);
            } else {
              setSave(true);
            }
            setMode("decrypt");
          })
          .catch((err) => {
            setError(true);
            setErrMsg(err.response.data.result)
          });
      }
    } else {
      postText(text, _key, algorithm, "decrypt", save)
        .then((res) => {
          if (!save) {
            setResult(res);
          } else {
            setSave(true);
          }
          setMode("decrypt");
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.response.data.result)
        });
    }
  };

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileBinary = async (e) => {
    console.log("yeh");
    setFileBinary(e.target.files[0]);
  };

  const handleReset = () => {
    console.log("aha");
    document.getElementById("fileteks").reset();
    document.getElementById("filebinary").reset();
    setFile(null);
    setFileBinary(null);
  };

  let keyTextBox;
  if (algorithm === "affine") {
    keyTextBox = (
      <div>
        <Input
          addonBefore={<b>m</b>}
          placeholder="ex: 7"
          style={{ marginBottom: 10 }}
          onChange={(e) => setM(e.target.value)}
        />
        <Input
          addonBefore={<b>b</b>}
          placeholder="ex: 10"
          onChange={(e) => setB(e.target.value)}
        />
      </div>
    );
  } else if (algorithm === "hill") {
    keyTextBox = (
      <TextArea
        autoSize={{ minRows: 6, maxRows: 6 }}
        placeholder="input square matrix! ex: 1, 2, 3 ,4, 5, 6, 7, 8, 9"
        onChange={(e) => setKey(e.target.value)}
      />
    );
  } else {
    keyTextBox = (
      <TextArea
        autoSize={{ minRows: 6, maxRows: 6 }}
        placeholder="type your key here!"
        onChange={(e) => setKey(e.target.value)}
      />
    );
  }

  return (
    <>
      <Row gutter={32}>
        <Col span={10}>
          <Row style={{ padding: 20, background: "#F7F7F7" }}>
            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "25px", padding: 3 }}>
                <b>Select Algorithm:</b>
              </div>

              <Select
                defaultValue="choose algorithm.."
                style={{ width: "100%" }}
                onChange={(value) => setAlgorithm(value)}
              >
                <Option value="vigenere">Vigenere</Option>
                <Option value="vigenere_full">Full Vigenere</Option>
                <Option value="vigenere_auto">Auto-Key Vigenere</Option>
                <Option value="vigenere_extended">Extended Vigenere</Option>
                <Option value="playfair">Playfair</Option>
                <Option value="affine">Affine</Option>
                <Option value="hill">Hill</Option>
                <Option value="super">Super Encryption</Option>
                <Option value="enigma">Enigma</Option>
              </Select>
            </Col>

            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "25px", padding: 3 }}>
                <b>Input:</b>
              </div>
              <Divider style={{ margin: 0 }} />
            </Col>

            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>Plain Text:</b>
              </div>
              {file || fileBinary ? (
                <TextArea
                  autoSize={{ minRows: 6, maxRows: 6 }}
                  placeholder="type your plain text here!"
                  onChange={(e) => setText(e.target.value)}
                  disabled
                />
              ) : (
                <TextArea
                  autoSize={{ minRows: 6, maxRows: 6 }}
                  placeholder="type your plain text here!"
                  onChange={(e) => setText(e.target.value)}
                />
              )}
            </Col>

            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>From text file:</b>
              </div>
              <form id="fileteks">
                {text ? (
                  <input
                    type="file"
                    onChange={(e) => handleFile(e)}
                    accept=".txt"
                    disabled
                  />
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleFile(e)}
                    accept=".txt"
                  />
                )}
              </form>
            </Col>

            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>From binary file:</b>
              </div>
              <form id="filebinary">
                {text ? (
                  <input
                    type="file"
                    onChange={(e) => handleFileBinary(e)}
                    disabled
                  />
                ) : (
                  <input type="file" onChange={(e) => handleFileBinary(e)} />
                )}
              </form>
            </Col>

            <Col span={8} style={{ marginBottom: 10 }}>
              <Button type="primary" danger block onClick={handleReset}>
                Reset File
              </Button>
            </Col>

            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "20px", padding: 3 }}>
                <b>Key:</b>
              </div>
              {keyTextBox}
            </Col>

            <Col span={24}>
              <Row gutter={32}>
                <Col span={8} style={{ marginBottom: 10 }}>
                  <Button
                    type="primary"
                    block
                    onClick={(e) => handleEncrypt(false, e)}
                  >
                    Encrypt
                  </Button>
                </Col>
                <Col span={8} style={{ marginBottom: 10 }}>
                  <Button
                    type="default"
                    block
                    style={{ color: "#1D8EFA" }}
                    onClick={(e) => handleDecrypt(false, e)}
                  >
                    Decrypt
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={14}>
          <Row style={{ padding: 20, background: "#F7F7F7" }}>
            <Col span={24} style={{ marginBottom: 10 }}>
              <div style={{ color: "#282C34", fontSize: "25px", padding: 3 }}>
                <b>Output:</b>
              </div>
              <Card style={{ width: "100%" }}>
                {display === "no_space" ? (
                  <TextArea
                    style={{ minHeight: "23vh" }}
                    readOnly
                    value={result}
                  />
                ) : (
                  <TextArea
                    style={{ minHeight: "23vh" }}
                    readOnly
                    value={groupString(result)}
                  />
                )}
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: 10 }}>
              <Radio.Group
                onChange={(e) => setDisplay(e.target.value)}
                value={display}
              >
                <Radio value={"no_space"}>without space</Radio>
                <Radio value={"5-alphabet"}>group 5 alphabet</Radio>
              </Radio.Group>
            </Col>
            <Col span={8} style={{ marginBottom: 10 }}>
              {mode === "encrypt" ? (
                <Button
                  type="primary"
                  block
                  onClick={(e) => handleEncrypt(true, e)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  onClick={(e) => handleDecrypt(true, e)}
                >
                  Save
                </Button>
              )}
            </Col>
            <Col span={24} style={{ marginBottom: 10 }}>
              {isSave ? (
                <Alert
                  message={<b>File successfuly saved!</b>}
                  description="File saved at root project folder /result"
                  type="success"
                  closable
                  onClose={(e) => {
                    setSave(false);
                  }}
                />
              ) : null}
            </Col>
            <Col span={24} style={{ marginBottom: 10 }}>
              {isError ? (
                <Alert
                  message={<b>Failed</b>}
                  description={errMsg}
                  type="error"
                  closable
                  onClose={(e) => {
                    setError(false);
                  }}
                />
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MainContent;
