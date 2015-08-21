Object.defineProperty(exports, '__esModule', {
	value: true
});

var _coreEventDispatcher = require('../core/EventDispatcher');

var _mathMath = require('../math/Math');

var _Three = require('../Three');

var _mathVector2 = require('../math/Vector2');

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

function THREE$Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
	this.isTexture = true;

	Object.defineProperty(this, 'id', { value: THREE$TextureIdCount() });

	this.uuid = _mathMath.THREE$Math.generateUUID();

	this.name = '';
	this.sourceFile = '';

	this.image = image !== undefined ? image : THREE$Texture.DEFAULT_IMAGE;
	this.mipmaps = [];

	this.mapping = mapping !== undefined ? mapping : THREE$Texture.DEFAULT_MAPPING;

	this.wrapS = wrapS !== undefined ? wrapS : _Three.THREE$ClampToEdgeWrapping;
	this.wrapT = wrapT !== undefined ? wrapT : _Three.THREE$ClampToEdgeWrapping;

	this.magFilter = magFilter !== undefined ? magFilter : _Three.THREE$LinearFilter;
	this.minFilter = minFilter !== undefined ? minFilter : _Three.THREE$LinearMipMapLinearFilter;

	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

	this.format = format !== undefined ? format : _Three.THREE$RGBAFormat;
	this.type = type !== undefined ? type : _Three.THREE$UnsignedByteType;

	this.offset = new _mathVector2.THREE$Vector2(0, 0);
	this.repeat = new _mathVector2.THREE$Vector2(1, 1);

	this.generateMipmaps = true;
	this.premultiplyAlpha = false;
	this.flipY = true;
	this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

	this.version = 0;
	this.onUpdate = null;
};

THREE$Texture.DEFAULT_IMAGE = undefined;
THREE$Texture.DEFAULT_MAPPING = _Three.THREE$UVMapping;

THREE$Texture.prototype = {

	constructor: THREE$Texture,

	set needsUpdate(value) {

		if (value === true) this.version++;
	},

	clone: function () {

		return new this.constructor().copy(this);
	},

	copy: function (source) {

		this.image = source.image;
		this.mipmaps = source.mipmaps.slice(0);

		this.mapping = source.mapping;

		this.wrapS = source.wrapS;
		this.wrapT = source.wrapT;

		this.magFilter = source.magFilter;
		this.minFilter = source.minFilter;

		this.anisotropy = source.anisotropy;

		this.format = source.format;
		this.type = source.type;

		this.offset.copy(source.offset);
		this.repeat.copy(source.repeat);

		this.generateMipmaps = source.generateMipmaps;
		this.premultiplyAlpha = source.premultiplyAlpha;
		this.flipY = source.flipY;
		this.unpackAlignment = source.unpackAlignment;

		return this;
	},

	toJSON: function (meta) {

		if (meta.textures[this.uuid] !== undefined) {

			return meta.textures[this.uuid];
		}

		function getDataURL(image) {

			var canvas;

			if (image.toDataURL !== undefined) {

				canvas = image;
			} else {

				canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;

				canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
			}

			if (canvas.width > 2048 || canvas.height > 2048) {

				return canvas.toDataURL('image/jpeg', 0.6);
			} else {

				return canvas.toDataURL('image/png');
			}
		}

		var output = {
			metadata: {
				version: 4.4,
				type: 'Texture',
				generator: 'Texture.toJSON'
			},

			uuid: this.uuid,
			name: this.name,

			mapping: this.mapping,

			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			wrap: [this.wrapS, this.wrapT],

			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy
		};

		if (this.image !== undefined) {

			// TODO: Move to THREE.Image

			var image = this.image;

			if (image.uuid === undefined) {

				image.uuid = _mathMath.THREE$Math.generateUUID(); // UGH
			}

			if (meta.images[image.uuid] === undefined) {

				meta.images[image.uuid] = {
					uuid: image.uuid,
					url: getDataURL(image)
				};
			}

			output.image = image.uuid;
		}

		meta.textures[this.uuid] = output;

		return output;
	},

	dispose: function () {

		this.dispatchEvent({ type: 'dispose' });
	}

};

_coreEventDispatcher.THREE$EventDispatcher.prototype.apply(THREE$Texture.prototype);

var count = 0;
function THREE$TextureIdCount() {
	return count++;
};

exports.THREE$TextureIdCount = THREE$TextureIdCount;
exports.THREE$Texture = THREE$Texture;