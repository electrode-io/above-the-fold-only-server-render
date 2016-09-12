/* global setTimeout */

import React from "react";
import { mount, shallow } from "enzyme";

import AboveTheFoldOnlyServerRender from "src/components/above-the-fold-only-server-render";
import SomeComponent from "test/mocks/some-component";

const SHOW_TIMEOUT = 50;

describe("components/above-the-fold-only-server-render", () => {
  describe("context", () => {

    it("should skip components based on contextKey", () => {
      const wrapper = mount(
        <SomeComponent>
          <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.CoolComponent">
            <div className="coolComponent"></div>
          </AboveTheFoldOnlyServerRender>
          <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.NeatComponent">
            <div className="neatComponent"></div>
          </AboveTheFoldOnlyServerRender>
        </SomeComponent>
      );

      expect(wrapper.find(".coolComponent")).to.have.length(0);
      expect(wrapper.find(".neatComponent")).to.have.length(1);
    });

  });

  describe("placeholder", () => {

    it("should set style for a default placeholder", () => {
      const style = {height: "100%", width: "50px"};
      const wrapper = shallow(
        <AboveTheFoldOnlyServerRender
          placeholderClassName="placeholderComponent"
          placeholderStyle={style}
          skip={true}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);
      expect(wrapper.find(".placeholderComponent").props().style).to.deep.equal({
        height: "100%",
        width: "50px"
      });
    });

    it("should render a custom placeholder", () => {
      const placeholder = (<div className="customPlaceholder"></div>);
      const wrapper = shallow(
        <AboveTheFoldOnlyServerRender skip={true} placeholder={placeholder}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);
      expect(wrapper.find(".customPlaceholder")).to.have.length(1);
    });

  });

  describe("server", () => {

    it("should not statically render a lazy child", () => {
      const wrapper = shallow(
        <AboveTheFoldOnlyServerRender placeholderClassName="placeholderComponent" skip={true}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );
      const html = wrapper.html();

      expect(html).to.not.include("someComponent");
      expect(html).to.include("placeholderComponent");
    });

    it("should statically render an unlazy child", () => {
      const wrapper = shallow(
        <AboveTheFoldOnlyServerRender placeholderClassName="placeholderComponent" skip={false}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );
      const html = wrapper.html();

      expect(html).to.include("someComponent");
      expect(html).to.not.include("placeholderComponent");
    });

  });

  describe("client", () => {

    it("should defer rendering a child that is lazy", (done) => {
      const wrapper = mount(
        <AboveTheFoldOnlyServerRender skip={true}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);

      setTimeout(() => {
        expect(wrapper.find(".someComponent")).to.have.length(1);
        done();
      }, SHOW_TIMEOUT);
    });

    it("should immediately render a child that is not lazy", () => {
      const wrapper = mount(
        <AboveTheFoldOnlyServerRender skip={false}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(1);
    });

    it("should clear the timeout when it unmounts", () => {
      const wrapper = mount(
        <AboveTheFoldOnlyServerRender skip={true}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );
      const instance = wrapper.instance();

      expect(instance.timeout).to.not.equal(undefined);
      wrapper.unmount();
      expect(instance.timeout).to.equal(undefined);
    });

    it("should handle missing timeout", () => {
      const wrapper = mount(
        <AboveTheFoldOnlyServerRender skip={true}>
          <div className="someComponent"></div>
        </AboveTheFoldOnlyServerRender>
      );
      const instance = wrapper.instance();

      instance.timeout = undefined;
      wrapper.unmount();
      expect(instance.timeout).to.equal(undefined);
    });
  });

});
