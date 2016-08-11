/* global setTimeout */

import React from "react";
import { mount, shallow } from "enzyme";

import SkipServerRender from "src/components/skip-server-render";

describe("components/skip-server-render", () => {
  describe("placeholder", () => {
    it("should set height and width for a default placeholder", () => {
      const wrapper = shallow(
        <SkipServerRender
          placeholderClassName="placeholderComponent"
          placeholderHeight="100%"
          placeholderWidth="50px"
          skip={true}>
          <div className="someComponent"></div>
        </SkipServerRender>
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
        <SkipServerRender skip={true} placeholder={placeholder}>
          <div className="someComponent"></div>
        </SkipServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);
      expect(wrapper.find(".customPlaceholder")).to.have.length(1);
    });
  });

  describe("server", () => {

    it("should not statically render a lazy child", () => {
      const wrapper = shallow(
        <SkipServerRender placeholderClassName="placeholderComponent" skip={true}>
          <div className="someComponent"></div>
        </SkipServerRender>
      );
      const html = wrapper.html();

      expect(html).to.not.include("someComponent");
      expect(html).to.include("placeholderComponent");
    });

    it("should statically render an unlazy child", () => {
      const wrapper = shallow(
        <SkipServerRender placeholderClassName="placeholderComponent" skip={false}>
          <div className="someComponent"></div>
        </SkipServerRender>
      );
      const html = wrapper.html();

      expect(html).to.include("someComponent");
      expect(html).to.not.include("placeholderComponent");
    });
  });

  describe("client", () => {

    it("should defer rendering a child that is lazy", (done) => {
      const wrapper = mount(
        <SkipServerRender skip={true}>
          <div className="someComponent"></div>
        </SkipServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);

      setTimeout(() => {
        expect(wrapper.find(".someComponent")).to.have.length(1);
        done();
      }, 55);
    });

    it("should immediately render a child that is not lazy", () => {
      const wrapper = mount(
        <SkipServerRender skip={false}>
          <div className="someComponent"></div>
        </SkipServerRender>
      );

      expect(wrapper.find(".someComponent")).to.have.length(1);
    });

    it("should clear the timeout when it unmounts", () => {
      const wrapper = mount(
        <SkipServerRender skip={true}>
          <div className="someComponent"></div>
        </SkipServerRender>
      );
      const instance = wrapper.instance();

      expect(instance.timeout).to.not.equal(undefined);
      wrapper.unmount();
      expect(instance.timeout).to.equal(undefined);
    });
  });

});
