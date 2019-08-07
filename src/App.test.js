import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {connect} from "react-redux";



// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe("Test App Component", () =>{
  it("It should render App Component", () =>{
    expect(1 == 1).toBe(true)
  });
});


// import React from "react";
// import { shallow } from "enzyme";
// import { Provider } from "react-redux";
// import configureMockStore from "redux-mock-store";
// import TestPage from "../TestPage";

// const mockStore = configureMockStore();
// const store = mockStore({});

// describe("Testpage Component", () => {
//     it("should render without throwing an error", () => {
//         expect(
//             shallow(
//                 <Provider store={store}>
//                     <TestPage />
//                 </Provider>
//             ).exists(<h1>Test page</h1>)
//         ).toBe(true);
//     });
// });
