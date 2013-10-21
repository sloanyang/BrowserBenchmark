package craftymind
{
	public class Vector3D
	{
		public var x:Number;
		public var y:Number;
		public var z:Number;
		public function Vector3D(x:Number=0, y:Number=0, z:Number=0){
			this.x = x;
			this.y = y;
			this.z = z;
		}
		
		public static function distance(vector1:Vector3D, vector2:Vector3D):Number {
			var xdiff:Number = vector1.x - vector2.x;
			var ydiff:Number = vector1.y - vector2.y;
			var zdiff:Number = vector1.z - vector2.z;
			return Math.sqrt((xdiff * xdiff) + (ydiff * ydiff) + (zdiff * zdiff));
			//return vector1.subtract(vector2).length;
		}
		
		public function get length():Number {
			return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
		}

		public function get lengthSquared():Number {
			return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
		}
		
		public function normalize():Number {
			var len:Number = this.length;
			this.x /= len;
			this.y /= len;
			this.z /= len;
			return len;
		}
		public function incrementBy(vector3d:Vector3D):void {
			this.x += vector3d.x;
			this.y += vector3d.y;
			this.z += vector3d.z;
		}
		public function decrementBy(vector3d:Vector3D):void {
			this.x -= vector3d.x;
			this.y -= vector3d.y;
			this.z -= vector3d.z;
		}
		public function scaleBy(scalar:Number):void {
			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
		}
		public function negate():void {
			this.x *= -1;
			this.y *= -1;
			this.z *= -1;
		}
		public function equals(vector3d:Vector3D):Boolean {
			return this.x == vector3d.x && this.y == vector3d.y && this.z == vector3d.z;
		}

		public function clone():Vector3D {
			return new Vector3D(this.x, this.y, this.z);
		}
		public function add(vector3d:Vector3D):Vector3D {
			return new Vector3D(this.x+vector3d.x, this.y+vector3d.y, this.z+vector3d.z);
		}
		public function subtract(vector3d:Vector3D):Vector3D{
			return new Vector3D(this.x-vector3d.x, this.y-vector3d.y, this.z-vector3d.z);
		}
		public function fastSubtract(vector3d:Vector3D, toCache:Vector3D):void{
			toCache.x = this.x-vector3d.x;
			toCache.y = this.y-vector3d.y;
			toCache.z = this.z-vector3d.z;
		}
	}
}