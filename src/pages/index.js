import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button, ButtonGroup, Row, Col, Container } from "reactstrap";
import styles from "./styles.module.css";
import Asciinema from "./asciinema";
import "../css/custom.css";
import "../css/bootstrap.css";

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
            <Row className={styles.actionButtons}>
              <ButtonGroup>
                <a href={useBaseUrl("docs/getting-started")}>
                  <Button color="primary">GET STARTED</Button>
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
