import { Assets } from "pixi.js"

interface Asset {
	asset: Awaited<typeof Assets.load>
	references: number
}

export class AssetManager {
	private assetCache: Record<string, Asset> = {}

	async loadBundle(assets: Record<string, string>) {
		return Object.fromEntries(
			await Promise.all(
				Object.entries(assets).map(async ([key, path]) => [
					key,
					await this.loadAsset(path),
				])
			)
		)
	}

	async unloadBundle(assets: Record<string, string>) {
		await Promise.all(
			Object.values(assets).map((path) => this.unloadAsset(path))
		)
	}

	private async loadAsset(assetPath: string) {
		if (this.assetCache[assetPath]) {
			++this.assetCache[assetPath].references

			return this.assetCache[assetPath].asset
		} else {
			const asset = await Assets.load(assetPath)
			this.assetCache[assetPath] = {
				asset,
				references: 1,
			}

			return asset
		}
	}

	private async unloadAsset(assetPath: string) {
		--this.assetCache[assetPath].references

		if (this.assetCache[assetPath].references <= 0) {
			await Assets.unload(assetPath)
			delete this.assetCache[assetPath]
		}
	}
}
