import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button, ButtonGroup } from 'reactstrap';
import styles from './styles.module.css';
import '../css/custom.css';
import siteConfig from '../../docusaurus.config';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const asyncExample = `
fn fibonacci_async(mut cx: FunctionContext) -> JsResult<JsUndefined> {
  let n = cx.argument::<JsNumber>(0)?.value() as usize;
  let cb = cx.argument::<JsFunction>(1)?;

  let task = FibonacciTask { argument: n };
  task.schedule(cb);

  Ok(cx.undefined())
}
`;

const printArgsExample = `
// Create a function that gets the number of arguments passed to it
fn get_args_len(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let args_length = cx.len();
    println!("{}", args_length);
    Ok(cx.number(args_length))
}
`;

const codeExamples = [
  {
    name: 'Async Fibonacci',
    code: asyncExample
  },
  {
    name: 'Make Array',
    code: neonExample
  },
  {
    name: 'Print Function Arguments',
    code: printArgsExample
  }
];

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
    title: <>Guaranteed Safety</>,
    description: (
      <>
        If a neon module compiles, it is guaranteed to be memory safe by the
        rust compiler
      </>
    ),
    imageUrl: 'img/checkmark.svg'
  },
  {
    title: <>Easy Parallelism</>,
    description: <>Safely run multiple threads without data races</>,
    imageUrl: 'img/fork.svg'
  }
];

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: codeExamples[0].code
    };
  }

  onButtonClick(index) {
    this.setState({
      currentCode: codeExamples[index].code
    });
  }

  render() {
    return (
      <>
        <ButtonGroup>
          {codeExamples.map((example, idx) => (
            <Button key={example.name} onClick={() => this.onButtonClick(idx)}>
              {example.name}
            </Button>
          ))}
        </ButtonGroup>
        <SyntaxHighlighter language="rust">
          {this.state.currentCode}
        </SyntaxHighlighter>
      </>
    );
  }
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={styles.header}>
        <div className="container">
          <Logo title={siteConfig.title} subtitle={siteConfig.tagline} />
          <div className="row" style={{ textAlign: 'left' }}>
            <SyntaxHighlighter
              customStyle={{ fontSize: '0.8em' }}
              language="javascript"
              useInlineStyles
            >
              {jsExample}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              customStyle={{ fontSize: '0.8em' }}
              language="rust"
              useInlineStyles
            >
              {neonExample}
            </SyntaxHighlighter>
          </div>
          <div className={styles.buttons}>
            <ButtonGroup>
              <a href={useBaseUrl('docs/getting-started')}>
                <Button>Try It Out</Button>
              </a>
              <a href={siteConfig.repoUrl}>
                <Button target="_blank">GitHub</Button>
              </a>
              <a href="https://neon-bindings.com/api/neon/index.html">
                <Button target="_blank">API</Button>
              </a>
            </ButtonGroup>
          </div>
        </div>
      </header>

      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
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
                          src={useBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={styles.features}>
          <div className="container">
            <Carousel />
          </div>
        </section>

        <section className={styles.features}>
          <div className="container">
            <iframe
              src="https://asciinema.org/a/269799/iframe"
              width="100%"
              height="300px"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
export default Home;
