"use strict";

/**
 * Represents an Avatar in the application.
 * @class
 */
export default class Avatar {
  /**
   * Creates an instance of Avatar.
   * @constructor
   * @param {Object} params - Avatar parameters.
   * @param {string} params.id - The unique identifier of the avatar.
   * @param {Object} params.position - The position of the avatar.
   * @param {Object} params.rotation - The rotation of the avatar.
   * @param {string} params.nickname - The nickname of the avatar.
   * @param {string} params.avatarUrl - The URL of the avatar's image.
   * @param {string} params.animation - The animation of the avatar.
   */
  constructor(id, position, rotation, nickname, avatarUrl, animation) {
    this.id = id;
    this.position = position;
    this.rotation = rotation;
    this.nickname = nickname;
    this.avatarUrl = avatarUrl;
    this.animation = animation;
  }
}
