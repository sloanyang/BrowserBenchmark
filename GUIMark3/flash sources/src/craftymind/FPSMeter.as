package craftymind
{
	import flash.utils.getTimer;

	public class FPSMeter
	{
		private var sampleFPS:Number = 0;
		private var lastSampledTime:uint = 0;
		private var sampleFrames:Number = 0;
		
		public var sampleDuration:uint = 500;
		public function increment():void {
			sampleFrames++;
		}
		public function getFramerate():Number {
			var diff:uint = getTimer()-lastSampledTime;
			if(diff >= sampleDuration){
				var rawFPS:Number = sampleFrames/(diff/1000);
				sampleFPS = FPSMeter.formatNumber(rawFPS);
				sampleFrames = 0;
				lastSampledTime = getTimer();
			}
			return sampleFPS;
		}
		public static function formatNumber(val:Number):Number{
			//format as XX.XX
			return Math.floor(val*100)/100;
		}
	}
}