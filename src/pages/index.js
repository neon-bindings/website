import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Button, ButtonGroup, Row, Col, Container } from "reactstrap";
import jsSyntax from "../core/js-syntax";
import neonSyntax from "../core/neon-syntax";
import styles from "./styles.module.css";
import Asciinema from "./asciinema";
import "../css/custom.css";
import "../css/bootstrap.css";

const jsExample = `
// JavaScript
function hello() {
  let result = fibonacci(10000);
  console.log(result);
  return result;
}
`.trim();

const neonExample = `
// Neon
fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
  let result = cx.number(fibonacci(10000));
  println!("{}", result);
  Ok(result)
}`.trim();

const Logo = (props) => (
  <div className="neonProjectLogo">
    <div className="neon-logo">
      <span className="open neon-heading neon-flicker-blink">
        {props.title}
      </span>
      <span className="hrs neon-subheading">{props.subtitle}</span>
    </div>
  </div>
);

const features = [
  {
    title: <>Simple tooling.</>,
    imageUrl: "img/hammer.svg",
    description: (
      <>No build scripts. No finicky system dependencies. Just Node and Rust.</>
    ),
  },
  {
    title: <>Guaranteed safety.</>,
    description: (
      <>
        If a Neon module compiles, it is guaranteed by the Rust compiler to be
        memory-safe.
      </>
    ),
    imageUrl: "img/checkmark.svg",
  },
  {
    title: <>Easy parallelism.</>,
    description: <>Safely run multiple threads—without data races.</>,
    imageUrl: "img/fork.svg",
  },
];

const CustomSyntaxHighlighter = (props) => (
  <SyntaxHighlighter
    {...props}
    customStyle={{
      background: "#08162E",
      margin: "30px 0",
      padding: "1em",
      textAlign: "left",
      fontSize: "90%",
      color: "white !important",
    }}
  >
    {props.children}
  </SyntaxHighlighter>
);

CustomSyntaxHighlighter.defaultProps = {
  language: "javascript",
};

// Concatenate a given array of styles
const cStyles = (_styles) => _styles.join(" ");

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <header className={cStyles([styles.header, styles.containerOdd])}>
        <Container>
          <Col xs="12" className="text-center">
            <Logo title={siteConfig.title} subtitle={siteConfig.tagline} />
            <Row>
              <Col xs={6}>
                <CustomSyntaxHighlighter
                  style={jsSyntax}
                  className="js-example"
                >
                  {jsExample}
                </CustomSyntaxHighlighter>
              </Col>
              <Col xs={6}>
                <CustomSyntaxHighlighter
                  language="rust"
                  style={neonSyntax}
                  className="rust-example"
                >
                  {neonExample}
                </CustomSyntaxHighlighter>
              </Col>
            </Row>
            <Row className={styles.actionButtons}>
              <ButtonGroup>
                <a href={useBaseUrl("docs/getting-started")}>
                  <Button color="primary">Get Started</Button>
                </a>
              </ButtonGroup>
            </Row>
          </Col>
        </Container>
      </header>

      <main>
        <section
          className={cStyles([styles.featuresContainer, styles.containerEven])}
        >
          {features && features.length && (
            <section>
              <Container>
                <Row>
                  {features.map(({ imageUrl, title, description }, idx) => (
                    <div
                      key={styles.featuresContainer}
                      className={classnames("col col--4", styles.feature)}
                    >
                      <h3
                        className={classnames(
                          styles.featureSubHeader,
                          styles[`featureSubHeader${idx}`]
                        )}
                      >
                        <span>
                          <img
                            className={styles.featureImage}
                            src={useBaseUrl(imageUrl)}
                            alt={title}
                          />
                        </span>
                        {title}
                      </h3>
                      <p className={styles.featureDescription}>{description}</p>
                    </div>
                  ))}
                </Row>
              </Container>
            </section>
          )}
        </section>

        <section
          className={cStyles([styles.featuresContainer, styles.containerOdd])}
        >
          <Container>
            <Col xs="12">
              <div style={{ width: "100%", display: "block" }}>
                <Asciinema src="./asciinema/demo.cast" preload theme="neon" />
              </div>
            </Col>
          </Container>
        </section>
      </main>
    </Layout>
  );
}
export default Home;
