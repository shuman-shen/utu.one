import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fakeData } from "./data/fakePriceList";
import axios from "axios";

import PriceListTable from "../components/priceListTable";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders table title", () => {
  act(() => {
    render(<PriceListTable />, container);
  });
  expect(container.textContent).toContain("Crypto");
});

it("renders price list", async () => {
  // jest.doMock("axios", () =>
  //   Promise.resolve({
  //     data: fakeData,
  //     statusText: "OK",
  //     status: 200,
  //   })
  // );
  // // Use the asynchronous version of act to apply resolved promises
  // await act(async () => {
  //   render(<PriceListTable />, container);
  // });
  // expect(container.textContent).toContain(11);
  // // remove the mock to ensure tests are completely isolated
  // global.fetch.mockRestore();
});
