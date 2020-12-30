import React, {lazy, Suspense} from 'react';

// 组件的懒加载（异步导入），使用 webpackChunkName 自定义文件名
const About = lazy(() => import(/* webpackChunkName: "about"*/'./about'))

// ErrorBoundary

class App extends React.Component {
  state = {
    hasError: true
  }

  // 由于网络或其他什么问题导致加载失败时的处理
  static getDerivedStateFromError() {
    return {hasError: true}
  }

  // componentDidCatch(error, errorInfo) {
  //   this.setState({
  //     hasError: true
  //   })
  // }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>
    }
    return (
      <div>
        {/*Suspense决定了当组件未载入时显示什么*/}
        <Suspense fallback={
          <div>Loading...</div>
        }>
          <About/>
        </Suspense>
      </div>
    )


  }
}

export default App;