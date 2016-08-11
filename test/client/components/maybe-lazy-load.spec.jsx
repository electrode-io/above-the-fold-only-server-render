import React from "react";
import { mount, shallow } from "enzyme";

import MaybeLazyLoad from "src/components/maybe-lazy-load";

describe("components/maybe-lazy-load", () => {

  describe("children", () => {

    it("should render with one child", () => {
      const wrapper = shallow(
        <MaybeLazyLoad lazy={false}>
          <div className="someComponent"></div>
        </MaybeLazyLoad>
      );

      expect(wrapper.find(".someComponent")).to.have.length(1);
    });

    it("should throw an error with multiple children", () => {
      expect(() => {
        shallow(
          <MaybeLazyLoad lazy={false}>
            <div></div>
            <div></div>
          </MaybeLazyLoad>
        );
      }).to.throw();
    });
  });

  describe("server", () => {

    it("should not statically render a lazy child", () => {
      const wrapper = shallow(
        <MaybeLazyLoad lazy={true}>
          <div className="someComponent"></div>
        </MaybeLazyLoad>
      );

      expect(wrapper.html()).to.not.include("someComponent");
    });

    it("should statically render an unlazy child", () => {
      const wrapper = shallow(
        <MaybeLazyLoad lazy={false}>
          <div className="someComponent"></div>
        </MaybeLazyLoad>
      );

      expect(wrapper.html()).to.include("someComponent");
    });
  });

  describe("client", () => {

    it("should not render an out of viewport lazy child", () => {
      const wrapper = mount(
        <div>
          <MaybeLazyLoad lazy={true} offset={100}>
            <div className="someComponent"></div>
          </MaybeLazyLoad>
        </div>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);
    });

    it("should always render an unlazy child", () => {
      const wrapper = mount(
        <div>
          <MaybeLazyLoad lazy={false} offset={100}>
            <div className="someComponent"></div>
          </MaybeLazyLoad>
        </div>
      );

      expect(wrapper.find(".someComponent")).to.have.length(1);
    });
  });

});
