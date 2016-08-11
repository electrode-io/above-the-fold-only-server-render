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

    it("should defer rendering a child that is lazy", (done) => {
      let wrapper;
      const onShow = () => {
        expect(wrapper.find(".someComponent")).to.have.length(1);
        done();
      };

      wrapper = mount(
        <MaybeLazyLoad lazy={true} onShow={onShow}>
          <div className="someComponent"></div>
        </MaybeLazyLoad>
      );

      expect(wrapper.find(".someComponent")).to.have.length(0);
    });

    it("should immediately render a child that is not lazy", () => {
      const wrapper = mount(
        <MaybeLazyLoad lazy={false}>
          <div className="someComponent"></div>
        </MaybeLazyLoad>
      );

      expect(wrapper.find(".someComponent")).to.have.length(1);
    });

    it("should clear the timeout when it unmounts", () => {
      const wrapper = mount(
        <MaybeLazyLoad lazy={true}>
          <div className="someComponent"></div>
        </MaybeLazyLoad>
      );
      const instance = wrapper.instance();

      expect(instance.timeout).to.not.equal(undefined);
      wrapper.unmount();
      expect(instance.timeout).to.equal(undefined);
    });
  });

});
