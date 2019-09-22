import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import withBaseUrl from '@docusaurus/withBaseUrl';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from './styles.module.css';
import '../css/custom.css';
import siteConfig from '../../docusaurus.config';

const jsExample = `
// JS
function hello() {
  let result = fibonacci(10000);
  console.log(result);
  return result;
}
`;

const neonExample = `
// Neon
fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
  let result = cx.number(fibonacci(10000));
  println!("{}", result);
  Ok(result)
}`;

const exampleCode = `
fn make_an_array(mut cx: FunctionContext) -> JsResult<JsArray> {
  // Create some values:
  let n = cx.number(9000);
  let s = cx.string("hello");
  let b = cx.boolean(true);
  // Create a new array:
  let array: Handle<JsArray> = cx.empty_array();
  // Push the values into the array:
  array.set(&mut cx, 0, n)?;
  array.set(&mut cx, 1, s)?;
  array.set(&mut cx, 2, b)?;
  // Return the array:
  Ok(array)
}
register_module!(mut cx, {
  // Export the Rust function as a JS function
  cx.export_function("makeAnArray", make_an_array)
})
`;

const Logo = props => (
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
    title: <>Simple Tooling</>,
    imageUrl: 'img/hammer.svg',
    description: (
      <>No makefiles. No fancy global build requirements. Just Node and Rust</>
    )
  },
  {
    title: <>'Guaranteed Safety'</>,
    description: (
      <>
        'If a neon module compiles, it is guaranteed to be memory safe by the
        rust compiler'
      </>
    ),
    imageUrl: 'img/checkmark.svg'
  },
  {
    title: <>'Easy Parallelism'</>,
    description: <>'Safely run multiple threads without data races'</>,
    imageUrl: 'img/fork.svg'
  }
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Logo title={siteConfig.title} subtitle={siteConfig.tagline} />
          <div className={styles.buttons}>
            <a href={withBaseUrl('docs/getting-started')}>
              <button>Try It Out</button>
            </a>
            <a href={siteConfig.repoUrl}>
              <button target="_blank">GitHub</button>
            </a>
            <a href="https://neon-bindings.com/api/neon/index.html">
              <button target="_blank">API</button>
            </a>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <SyntaxHighlighter language="rust">
                {exampleCode}
              </SyntaxHighlighter>
              <SyntaxHighlighter language="rust">{jsExample}</SyntaxHighlighter>
              <SyntaxHighlighter language="rust">
                {neonExample}
              </SyntaxHighlighter>
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div
                    key={styles.feature}
                    className={classnames('col col--4', styles.feature)}
                  >
                    {imageUrl && (
                      <div className="text--center">
                        <img
                          className={styles.featureImage}
                          src={withBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
              <iframe src="https://asciinema.org/a/269799/iframe" />
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
